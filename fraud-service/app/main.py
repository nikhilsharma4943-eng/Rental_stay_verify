from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from .fraud_detector import evaluate_fraud_risk

app = FastAPI(
    title="StayVerify Fraud Evaluation Service",
    description="Independent service for analyzing rental price deviations and verification compliance",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PropertyEvaluationRequest(BaseModel):
    property_id: str
    type: str = Field(default="PG", description="Property category (PG, Hostel, Room, Flat)")
    location: Optional[str] = None
    rent: float = Field(ge=0, description="Monthly rental amount in INR")
    deposit: float = Field(default=0, ge=0, description="Refundable security deposit in INR")
    owner_verified: bool = Field(default=False)
    evidence_verified: bool = Field(default=False)

@app.get("/")
def health_check():
    return {
        "service": "StayVerify Fraud Service",
        "status": "healthy",
        "version": "1.0.0"
    }

@app.post("/api/fraud/evaluate")
def evaluate_property(payload: PropertyEvaluationRequest):
    return evaluate_fraud_risk(payload.model_dump())
