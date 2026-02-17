/**
 * API client for Flask backend prediction service.
 * Falls back to local pre-computed weights if the API is unavailable.
 */

import { type UserInput, type PredictionResult, predict as localPredict } from "./model";

// Set this to your deployed Flask API URL (e.g., https://visa-prediction-api.onrender.com)
const API_URL = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";

interface ApiPayload {
  has_job_experience: boolean;
  requires_job_training: boolean;
  no_of_employees: number;
  yr_of_estab: number;
  prevailing_wage: number;
  full_time_position: boolean;
  continent: string;
  education: string;
  region: string;
  unit_of_wage: string;
}

function toApiPayload(input: UserInput): ApiPayload {
  return {
    has_job_experience: input.hasJobExperience,
    requires_job_training: input.requiresJobTraining,
    no_of_employees: input.numberOfEmployees,
    yr_of_estab: input.yearOfEstablishment,
    prevailing_wage: input.prevailingWage,
    full_time_position: input.fullTimePosition,
    continent: input.continent,
    education: input.education,
    region: input.region,
    unit_of_wage: input.unitOfWage,
  };
}

export async function predictFromApi(input: UserInput): Promise<PredictionResult> {
  try {
    const res = await fetch(`${API_URL}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toApiPayload(input)),
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    return {
      approvalProbability: data.approvalProbability,
      predictedStatus: data.predictedStatus,
      processingDays: data.processingDays,
      processingDaysLow: data.processingDaysLow,
      processingDaysHigh: data.processingDaysHigh,
      confidence: data.confidence,
    };
  } catch (err) {
    console.warn("Flask API unavailable, using local model fallback:", err);
    return localPredict(input);
  }
}
