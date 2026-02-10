

# Visa Prediction Engine - Complete Upgrade Plan

## Overview
This plan upgrades the app into a professional, portfolio-ready ML prediction tool. Since this is a browser-based React application (no Python/scikit-learn backend), we will pre-compute model coefficients from the uploaded 25K-row dataset and embed them as trained weights in the app. This gives real, data-driven predictions -- not hardcoded random values.

## Dataset Summary
- **25,480 rows**, preprocessed with normalized/encoded features
- **Target columns**: `case_status` (0/1 classification), `processing_time_days` (regression)
- **Features**: `has_job_experience`, `requires_job_training`, `no_of_employees`, `yr_of_estab`, `prevailing_wage`, `full_time_position`, plus one-hot encoded continent, education, region, unit_of_wage, and engineered flags

---

## Implementation Steps

### Step 1: Data-Driven Prediction Engine
Create `src/lib/model.ts` containing:
- Pre-computed logistic regression weights for visa status classification (derived from analyzing the dataset's feature-outcome correlations)
- Pre-computed linear regression coefficients for processing time estimation
- Prediction functions that take user inputs, encode them to match the dataset's feature format, and return: approval probability, predicted status, estimated processing days with confidence interval
- Model performance metrics (pre-calculated from the dataset)

### Step 2: Copy Dataset to Project
Copy `EasyVisa_Milestone2_Final.csv` to `public/data/` so model statistics can reference the real data distribution.

### Step 3: Revamp Hero Section
- Bold headline: "AI-Powered Visa Approval & Processing Time Predictor"
- Subtitle explaining ML-based prediction
- Enhanced gradient background with subtle entrance animation using CSS keyframes
- Updated stat cards with real metrics

### Step 4: Upgrade Prediction Form (`PredictionForm.tsx`)
- Clean two-column grid layout
- Tooltips on each field using Radix Tooltip component
- Input validation (no negatives, realistic wage ranges)
- Reset button alongside the submit button
- Map form fields to the dataset's feature encoding internally

### Step 5: Enhanced Results Section
Split into two result cards:
- **Visa Status Card**: Predicted status with checkmark/cross icon, confidence percentage, animated progress bar (green for Certified, red for Denied), probability pie chart using Recharts
- **Processing Time Card**: Estimated days with +/- range, expected range display (e.g., "39 - 49 days"), styled in a modern card

### Step 6: Probability Visualization
Add a Recharts bar chart showing Certified vs Denied probability side by side.

### Step 7: "How It Works" Section
New component `HowItWorks.tsx` with concise 3-step explanation: Data Collection, Model Training, Real-time Prediction. Professional and brief.

### Step 8: Model Performance Section
New component `ModelMetrics.tsx` displaying:
- MAE, RMSE, R-squared (regression)
- Accuracy, Precision, Recall (classification)
- Displayed in a clean metrics card grid

### Step 9: Footer
New `Footer.tsx` with project attribution, year, and GitHub link placeholder.

### Step 10: Light/Dark Mode Toggle
- Add a theme toggle button in the Navbar using `next-themes`
- Add light mode CSS variables in `index.css`

### Step 11: Loading & Animations
- Smooth loading spinner during prediction
- Fade-in transitions on result cards
- Section entrance animations via CSS

---

## Technical Details

### Model Coefficient Approach
Since we cannot run Python ML libraries in the browser, we will:
1. Analyze the CSV to compute feature correlations with `case_status` and `processing_time_days`
2. Derive logistic regression weights (for classification) and linear regression coefficients (for processing time)
3. Embed these as constants in `src/lib/model.ts`
4. Map user form inputs to the same encoded feature space the dataset uses
5. Compute predictions using sigmoid function (classification) and dot product (regression)

This produces real, data-driven predictions that vary based on user input -- not random or hardcoded values.

### Files to Create
- `src/lib/model.ts` - Prediction engine with pre-computed weights
- `src/components/HowItWorks.tsx` - How it works section
- `src/components/ModelMetrics.tsx` - Model performance display
- `src/components/Footer.tsx` - Footer component
- `public/data/EasyVisa_Milestone2_Final.csv` - Dataset copy

### Files to Modify
- `src/components/HeroSection.tsx` - Updated headline, animations
- `src/components/PredictionForm.tsx` - Major overhaul with validation, tooltips, new results UI, charts
- `src/components/Navbar.tsx` - Add dark/light mode toggle
- `src/index.css` - Add light theme variables, new animations
- `src/pages/Index.tsx` - Add new sections (HowItWorks, ModelMetrics, Footer)
- `tailwind.config.ts` - Add new animation keyframes

