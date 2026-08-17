import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score


# =========================
# 1. Load dataset
# =========================

df = pd.read_csv("data/alzheimers_cleaned.csv")


# =========================
# 2. Separate X and y
# =========================

X = df.drop(
    columns=[
        "Diagnosis",
        "PatientID",
        "DoctorInCharge"
    ]
)

y = df["Diagnosis"]


# =========================
# 3. Train/test split
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# =========================
# 4. First Random Forest
# =========================

feature_selector_model = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="median")
    ),
    (
        "random_forest",
        RandomForestClassifier(
            n_estimators=300,
            random_state=42,
            class_weight="balanced",
            n_jobs=-1
        )
    )
])


feature_selector_model.fit(
    X_train,
    y_train
)


# =========================
# 5. Feature Importance
# =========================

rf = feature_selector_model.named_steps[
    "random_forest"
]

feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": rf.feature_importances_
})


feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)


print("\nFeature Importance:")
print(feature_importance)


# =========================
# 6. Select top features
# =========================

TOP_N = 10

top_features = (
    feature_importance
    .head(TOP_N)["Feature"]
    .tolist()
)


print("\nTop Features:")

for feature in top_features:
    print(feature)


# =========================
# 7. Select top features
# =========================

X_train_top = X_train[top_features]
X_test_top = X_test[top_features]


# =========================
# 8. Final ML Pipeline
# =========================

final_model = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="median")
    ),
    (
        "random_forest",
        RandomForestClassifier(
            n_estimators=300,
            random_state=42,
            class_weight="balanced",
            n_jobs=-1
        )
    )
])


# =========================
# 9. Train final model
# =========================

final_model.fit(
    X_train_top,
    y_train
)


# =========================
# 10. Prediction
# =========================

y_pred = final_model.predict(
    X_test_top
)

y_probability = final_model.predict_proba(
    X_test_top
)[:, 1]


# =========================
# 11. Evaluation
# =========================

accuracy = accuracy_score(
    y_test,
    y_pred
)

roc_auc = roc_auc_score(
    y_test,
    y_probability
)


print("\n==========================")
print("FINAL MODEL RESULTS")
print("==========================")

print(f"Accuracy : {accuracy:.4f}")
print(f"ROC-AUC  : {roc_auc:.4f}")

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# =========================
# 12. Create models folder
# =========================

os.makedirs(
    "models",
    exist_ok=True
)


# =========================
# 13. Save final pipeline
# =========================

joblib.dump(
    final_model,
    "models/alzheimer_model.pkl"
)


# =========================
# 14. Save top features
# =========================

joblib.dump(
    top_features,
    "models/top_features.pkl"
)


print("\n==========================")
print("MODEL SAVED")
print("==========================")

print("models/alzheimer_model.pkl")
print("models/top_features.pkl")