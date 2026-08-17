import joblib


model = joblib.load(
    "models/alzheimer_model.pkl"
)


top_features = joblib.load(
    "models/top_features.pkl"
)