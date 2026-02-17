# Visa Prediction API — Flask + scikit-learn Backend

## Quick Start

```bash
cd backend
pip install -r requirements.txt

# Train models (generates models/ directory)
python train_model.py

# Start Flask server
python app.py
```

The API will be available at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint         | Description                    |
|--------|-----------------|--------------------------------|
| POST   | `/api/predict`  | Run visa prediction            |
| GET    | `/api/metrics`  | Get model performance metrics  |
| GET    | `/api/health`   | Health check                   |

### POST /api/predict

```json
{
  "has_job_experience": true,
  "requires_job_training": false,
  "no_of_employees": 500,
  "yr_of_estab": 2005,
  "prevailing_wage": 85000,
  "full_time_position": true,
  "continent": "Asia",
  "education": "Master's",
  "region": "Northeast",
  "unit_of_wage": "Year"
}
```

### Response

```json
{
  "approvalProbability": 0.847,
  "predictedStatus": "Certified",
  "processingDays": 28,
  "processingDaysLow": 25,
  "processingDaysHigh": 31,
  "confidence": 85
}
```

## Deploy to Render.com

1. Push this `backend/` folder to a GitHub repo
2. Create a new **Web Service** on Render
3. Connect the repo and Render will auto-detect `render.yaml`
4. Set the `FLASK_API_URL` in your React frontend to the Render URL

## Tech Stack

- **Python 3.11** + **Flask**
- **scikit-learn** (Random Forest Classifier + Gradient Boosting Regressor)
- **joblib** for model serialization
- **gunicorn** for production serving
