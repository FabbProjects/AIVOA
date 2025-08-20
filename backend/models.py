# qms-backend/models.py
# --- THIS IS THE NEW, CORRECTED CODE ---

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# We no longer need separate "Step" models for the creation request,
# as the frontend sends all the data at once.

class EventCreateRequest(BaseModel):
    # Step 1 Fields
    eventTitle: str = Field(..., min_length=3, description="Title or subject of the event")
    eventType: str = Field(..., description="The type of QMS event (e.g., Audit, Incident)")
    initiator: str = Field(..., description="The person who initiated or reported the event")
    department: str = Field(..., description="The department associated with the event")
    eventDateTime: datetime = Field(..., description="The exact date and time the event occurred")

    # Step 2 Fields
    description: Optional[str] = Field(None, description="A detailed description of the event")
    location: Optional[str] = Field(None, description="The location where the event occurred")
    responsibleParty: Optional[str] = Field(None, description="The person or party assigned to handle the event")
    
    # Step 3 Fields
    severity: str = Field(..., description="The severity level (e.g., Critical, High, Medium, Low)")
    priority: str = Field(..., description="The priority level (e.g., High, Medium, Low)")
    status: str = Field("Open", description="The current status of the event (e.g., Open, In Progress)")
    dueDate: Optional[datetime] = Field(None, description="The date by which the event should be resolved")

    # We will ignore attachments for now as file handling is more complex
    # attachments: Optional[List[str]] = []


# The Event model represents the data as it is stored in our "database"
# It includes the creation data plus system-generated fields like ID and timestamps.
class Event(EventCreateRequest):
    id: int
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    # This config helps Pydantic convert datetime objects to ISO strings in JSON responses
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }