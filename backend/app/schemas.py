from pydantic import BaseModel


class AlzheimerInput(BaseModel):
    FunctionalAssessment: float
    ADL: float
    MMSE: float
    MemoryComplaints: int
    BehavioralProblems: int
    CholesterolHDL: float
    DietQuality: float
    PhysicalActivity: float
    CholesterolTriglycerides: float
    BMI: float