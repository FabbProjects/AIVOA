from typing import List, Dict
from models import Event, EventCreateRequest
import copy

# Simple in-memory database
events_db: List[Dict] = []
_next_id = 1

def get_next_id():
    global _next_id
    current_id = _next_id
    _next_id += 1
    return current_id

def create_event_in_db(event_data: EventCreateRequest) -> Event:
    event_dict = event_data.model_dump()
    event_id = get_next_id()
    new_event = Event(id=event_id, **event_dict)
    events_db.append(new_event.model_dump())
    return new_event

def get_events_from_db() -> List[Event]:
    # Return deep copy to prevent external modification of internal state
    return [Event(**event) for event in copy.deepcopy(events_db)]