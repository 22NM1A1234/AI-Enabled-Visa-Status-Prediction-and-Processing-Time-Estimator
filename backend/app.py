"""
Flask API for Visa Prediction
Serves trained scikit-learn models via REST endpoints.

Usage:
    python app.py          # Development
    gunicorn app:app       # Production (Render)
"""

import os
import json
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to call this API

# ── Load trained models ──
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
classifier = joblib.load(os.path.join(MODEL_DIR, "classifier.pkl"))
regressor_path = os.path.join(MODEL_DIR, "regressor.pkl")
regressor = joblib.load(regressor_path) if os.path.exists(regressor_path) else None

with open(os.path.join(MODEL_DIR, "metrics.json")) as f:
    metrics = json.load(f)

FEATURES = metrics["features"]


def encode_input(data: dict) -> np.ndarray:
    """Convert user-friendly JSON input to model feature vector."""
    vec = []
    for feat in FEATURES:
        if feat in ("has_job_experience", "requires_job_training", "full_time_position"):
            vec.append(1 if data.get(feat, False) else 0)
        elif feat in ("no_of_employees", "yr_of_estab", "prevailing_wage"):
            vec.append(float(data.get(feat, 0)))
        elif feat.startswith("continent_"):
            continent = data.get("continent", "")
            vec.append(1 if feat == f"continent_{continent}" else 0)
        elif feat.startswith("education_of_employee_"):
            edu = data.get("education", "")
            vec.append(1 if feat == f"education_of_employee_{edu}" else 0)
        elif feat.startswith("region_of_employment_"):
            region = data.get("region", "")
            vec.append(1 if feat == f"region_of_employment_{region}" else 0)
        elif feat.startswith("unit_of_wage_"):
            unit = data.get("unit_of_wage", "")
            vec.append(1 if feat == f"unit_of_wage_{unit}" else 0)
        else:
            vec.append(float(data.get(feat, 0)))
    return np.array([vec])


@app.route("/api/predict", methods=["POST"])
def predict():
    """Run prediction on user input."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input provided"}), 400

    try:
        X = encode_input(data)

        # Classification
        proba = classifier.predict_proba(X)[0]
        approval_prob = float(proba[1]) if len(proba) > 1 else float(proba[0])
        status = "Certified" if approval_prob >= 0.5 else "Denied"
        confidence = int(min(99, max(51, abs(approval_prob - 0.5) * 200 + 50)))

        # Regression
        if regressor is not None:
            raw_days = float(regressor.predict(X)[0])
            processing_days = max(5, min(90, round(raw_days)))
        else:
            processing_days = 30  # fallback

        margin = round(processing_days * 0.12)

        result = {
            "approvalProbability": round(approval_prob, 3),
            "predictedStatus": status,
            "processingDays": processing_days,
            "processingDaysLow": max(3, processing_days - margin),
            "processingDaysHigh": processing_days + margin,
            "confidence": confidence,
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/metrics", methods=["GET"])
def get_metrics():
    """Return model performance metrics."""
    return jsonify(metrics)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
