"""
Train ML models for Visa Prediction
- Random Forest Classifier (visa approval)
- Gradient Boosting Regressor (processing time)

Usage:
    python train_model.py

Outputs:
    - models/classifier.pkl
    - models/regressor.pkl
    - models/metrics.json
"""

import os
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    mean_absolute_error, mean_squared_error, r2_score
)
import joblib

# ── Load dataset ──
DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "data", "EasyVisa_Milestone2_Final.csv")
df = pd.read_csv(DATA_PATH)

print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
print(f"Columns: {list(df.columns)}")

# ── Feature columns ──
# Adjust these based on actual column names in your CSV
FEATURE_COLS = [
    "has_job_experience", "requires_job_training",
    "no_of_employees", "yr_of_estab", "prevailing_wage",
    "full_time_position",
    # One-hot encoded columns (adjust names to match your CSV)
    "continent_Asia", "continent_Europe", "continent_North America",
    "continent_Oceania", "continent_South America",
    "education_of_employee_Doctorate", "education_of_employee_High School",
    "education_of_employee_Master's",
    "region_of_employment_Midwest", "region_of_employment_Northeast",
    "region_of_employment_South", "region_of_employment_West",
    "unit_of_wage_Month", "unit_of_wage_Week", "unit_of_wage_Year",
]

# Filter to columns that exist in the dataset
available_features = [c for c in FEATURE_COLS if c in df.columns]
print(f"\nUsing {len(available_features)} features: {available_features}")

X = df[available_features].values

# ── Targets ──
y_class = df["case_status"].values  # 0 or 1
y_reg = df["processing_time_days"].values if "processing_time_days" in df.columns else None

# ── Train/Test Split ──
X_train, X_test, y_cls_train, y_cls_test = train_test_split(
    X, y_class, test_size=0.2, random_state=42, stratify=y_class
)

if y_reg is not None:
    _, _, y_reg_train, y_reg_test = train_test_split(
        X, y_reg, test_size=0.2, random_state=42
    )

# ── Train Random Forest Classifier ──
print("\n🔧 Training Random Forest Classifier...")
rf_params = {
    "n_estimators": [100, 200],
    "max_depth": [10, 20, None],
    "min_samples_split": [2, 5],
}
rf = GridSearchCV(
    RandomForestClassifier(random_state=42),
    rf_params, cv=3, scoring="accuracy", n_jobs=-1, verbose=1
)
rf.fit(X_train, y_cls_train)
best_clf = rf.best_estimator_
print(f"Best params: {rf.best_params_}")

y_cls_pred = best_clf.predict(X_test)
cls_metrics = {
    "accuracy": round(accuracy_score(y_cls_test, y_cls_pred), 4),
    "precision": round(precision_score(y_cls_test, y_cls_pred), 4),
    "recall": round(recall_score(y_cls_test, y_cls_pred), 4),
    "f1_score": round(f1_score(y_cls_test, y_cls_pred), 4),
}
print(f"Classification: {cls_metrics}")

# ── Train Gradient Boosting Regressor ──
reg_metrics = {}
best_reg = None
if y_reg is not None:
    print("\n🔧 Training Gradient Boosting Regressor...")
    gb_params = {
        "n_estimators": [100, 200],
        "max_depth": [3, 5],
        "learning_rate": [0.05, 0.1],
    }
    gb = GridSearchCV(
        GradientBoostingRegressor(random_state=42),
        gb_params, cv=3, scoring="neg_mean_absolute_error", n_jobs=-1, verbose=1
    )
    gb.fit(X_train, y_reg_train)
    best_reg = gb.best_estimator_
    print(f"Best params: {gb.best_params_}")

    y_reg_pred = best_reg.predict(X_test)
    reg_metrics = {
        "mae": round(mean_absolute_error(y_reg_test, y_reg_pred), 2),
        "rmse": round(np.sqrt(mean_squared_error(y_reg_test, y_reg_pred)), 2),
        "r2": round(r2_score(y_reg_test, y_reg_pred), 4),
    }
    print(f"Regression: {reg_metrics}")

# ── Save models ──
os.makedirs("models", exist_ok=True)
joblib.dump(best_clf, "models/classifier.pkl")
print("\n✅ Saved models/classifier.pkl")

if best_reg is not None:
    joblib.dump(best_reg, "models/regressor.pkl")
    print("✅ Saved models/regressor.pkl")

# Save metrics + feature list
metrics = {
    "classification": cls_metrics,
    "regression": reg_metrics,
    "dataset_size": int(df.shape[0]),
    "train_size": int(X_train.shape[0]),
    "test_size": int(X_test.shape[0]),
    "features": available_features,
}
with open("models/metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)
print("✅ Saved models/metrics.json")
print("\n🎉 Training complete!")
