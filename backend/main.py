from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from models import EventCreateRequest, Event
from pydantic import BaseModel
from ai_services import process_ai_prompt
from storage import create_event_in_db, get_events_from_db
from typing import List

app = FastAPI(
    title="QMS Event Module API",
    description="API for managing QMS events, including creation and listing."
)

# CORS Middleware for Frontend Communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/events", response_model=Event, status_code=status.HTTP_201_CREATED)
async def create_qms_event(event_request: EventCreateRequest):
    """
    Endpoint to create a new QMS event.
    Receives complete event data, validates it, and stores it.
    """
    try:
        new_event = create_event_in_db(event_request)
        return new_event
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create event: {str(e)}")

@app.get("/events", response_model=List[Event])
async def get_all_qms_events():
    """
    Endpoint to retrieve a list of all QMS events.
    """
    events = get_events_from_db()
    return events

# Define the request model for the AI prompt
class AIRequest(BaseModel):
    prompt: str

# --- New AI Endpoint ---

@app.post("/ai/ask", status_code=200)
async def ask_ai_assistant(request: AIRequest):
    """
    Receives a user prompt, fetches the current event data to use as context,
    and calls the AI orchestrator to get an intelligent response.
    """
    try:
        # Provide the AI with the most current data from our in-memory store
        current_events = [event.model_dump() for event in get_events_from_db()]
        
        if not current_events:
            return {"response": "There are no events in the system yet to analyze. Please create some events first."}
            
        ai_response = process_ai_prompt(request.prompt, current_events)
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred in the AI service: {str(e)}")

