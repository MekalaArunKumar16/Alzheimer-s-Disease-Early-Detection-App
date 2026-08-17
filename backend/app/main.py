from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from app.schemas import AlzheimerInput
from app.model import model, top_features


app = FastAPI(
    title="Alzheimer's Prediction API",
    description="Alzheimer's classification using Random Forest",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Alzheimer's Prediction API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "Random Forest"
    }


@app.post("/predict")
def predict(data: AlzheimerInput):

    try:

        input_dict = data.model_dump()

        input_data = pd.DataFrame(
            [input_dict],
            columns=top_features
        )

        prediction = model.predict(
            input_data
        )[0]

        probability = model.predict_proba(
            input_data
        )[0][1]

        if prediction == 1:
            result = "Positive"
        else:
            result = "Negative"

        return {
            "prediction": int(prediction),
            "result": result,
            "probability": round(
                float(probability),
                4
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/model-info")
def model_info():

    # Get the Random Forest from the pipeline
    random_forest = model.named_steps["random_forest"]

    # Get feature importance
    importances = random_forest.feature_importances_

    # Match importance values with the selected features
    feature_importance = {
        feature: round(float(importance), 4)
        for feature, importance in zip(
            top_features,
            importances
        )
    }

    # Sort highest → lowest
    feature_importance = dict(
        sorted(
            feature_importance.items(),
            key=lambda x: x[1],
            reverse=True
        )
    )

    return {
        "algorithm": type(random_forest).__name__,
        "n_estimators": random_forest.n_estimators,
        "features": len(top_features),
        "top_features": top_features,
        "feature_importance": feature_importance
    }