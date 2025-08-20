# qms-backend/ai_services.py

import os
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List, Dict
import json
from datetime import datetime, timedelta

load_dotenv()

try:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    print("Gemini AI Model configured successfully with Gemini 1.5 Pro.")
except Exception as e:
    print(f"Error configuring Gemini AI: {e}")
    model = None

# --- AI-Powered Tools (These functions are unchanged) ---

def get_high_risk_events(events: List[Dict]) -> str:
    high_risk = [
        event for event in events
        if event.get('severity') in ['Critical', 'High'] or event.get('priority') == 'High'
    ]
    if not high_risk:
        return "No high-risk events found."
    summary = f"Found {len(high_risk)} high-risk events:\n"
    for event in high_risk:
        summary += f"- ID {event['id']}: {event['eventTitle']} (Severity: {event['severity']}, Priority: {event['priority']})\n"
    return summary

def summarize_recent_open_events(events: List[Dict]) -> str:
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_open = [
        event for event in events
        if event.get('status') == 'Open' and datetime.fromisoformat(event['createdAt'].replace('Z', '')) > thirty_days_ago
    ]
    if not recent_open:
        return "No open events were created in the last 30 days."
    summary = f"Summary of {len(recent_open)} open events from the last 30 days:\n"
    by_type = {}
    for event in recent_open:
        evt_type = event['eventType']
        by_type[evt_type] = by_type.get(evt_type, 0) + 1
    for evt_type, count in by_type.items():
        summary += f"- {evt_type}: {count} event(s)\n"
    return summary

def suggest_next_steps(event_id: int, events: List[Dict]) -> str:
    event = next((e for e in events if e.get('id') == event_id), None)
    if not event:
        return f"Error: Event with ID {event_id} not found."
    prompt = f"As a QMS expert, suggest 3-4 concise, actionable next steps for the following quality event...\nEvent Details:\n- Title: {event['eventTitle']}...\nSuggested Next Steps:"
    if not model: return "AI model not available."
    response = model.generate_content(prompt)
    return response.text

def generate_closure_notification(event_id: int, events: List[Dict]) -> str:
    event = next((e for e in events if e.get('id') == event_id), None)
    if not event:
        return f"Error: Event with ID {event_id} not found."
    prompt = f"Draft a professional, brief notification email to stakeholders announcing the closure of a QMS event...\nEvent Details:\n- ID: {event['id']}...\nDraft Email:"
    if not model: return "AI model not available."
    response = model.generate_content(prompt)
    return response.text

# --- AI Orchestrator (This function is now corrected and more robust) ---

def process_ai_prompt(prompt: str, events: List[Dict]) -> str:
    if not model:
        return "The AI model is not configured. Please check your API key."

    # ==================================================================
    # CHANGE #1: A much smarter and more detailed prompt for the AI
    # ==================================================================
    intent_prompt = f"""
    Analyze the user's request about QMS events. Your goal is to choose the correct tool and extract its parameters.
    Respond ONLY with a valid JSON object.

    Available Tools:
    - "get_high_risk": Use for any request about risk, critical, severe, or high-priority events.
    - "summarize_recent_open": Use for summaries of events that are open and created recently (e.g., "last month", "new events").
    - "suggest_next_steps": Use ONLY when the user asks for actions or next steps for a SPECIFIC event. This tool requires an 'event_id', which MUST be a number. If you see "event 123", extract 123.
    - "generate_closure_notification": Use ONLY when the user asks to write, draft, or generate a notification or email for closing a SPECIFIC event. Requires an 'event_id', which MUST be a number.
    - "general_query": Use as a fallback if no other tool is a clear match.

    Example:
    User Request: "what should we do about event 2"
    JSON Response: {{"tool_name": "suggest_next_steps", "parameters": {{"event_id": 2}}}}

    User Request: "{prompt}"
    JSON Response:
    """
    
    try:
        response = model.generate_content(intent_prompt)
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "")
        intent = json.loads(cleaned_response)
        
        tool_name = intent.get("tool_name")
        params = intent.get("parameters", {})

        # --- Tool Execution ---
        if tool_name == "get_high_risk":
            return get_high_risk_events(events)
        
        elif tool_name == "summarize_recent_open":
            return summarize_recent_open_events(events)
        
        # ==================================================================
        # CHANGE #2: A "safety net" to prevent crashes
        # ==================================================================
        elif tool_name in ["suggest_next_steps", "generate_closure_notification"] and "event_id" in params:
            try:
                # Safely try to convert the event_id to an integer
                event_id_int = int(params["event_id"])
                
                if tool_name == "suggest_next_steps":
                    return suggest_next_steps(event_id_int, events)
                else: # tool_name is "generate_closure_notification"
                    return generate_closure_notification(event_id_int, events)

            except (ValueError, TypeError):
                # If conversion fails, the AI made a mistake. Fall back gracefully.
                return f"I see you're asking about an event, but I couldn't identify a valid numeric event ID in your request. Please specify the ID, for example: 'What are the next steps for event ID 1?'"
        
        else:
            # Fallback for general questions
            general_prompt = f"As a QMS assistant, answer the following question. If the question seems to be about the provided events, use them as context.\n\nUser Question: {prompt}"
            general_response = model.generate_content(general_prompt)
            return general_response.text

    except Exception as e:
        # This is a catch-all for other errors, like if the AI returns invalid JSON
        return f"Sorry, I had trouble understanding that. Please try rephrasing your request. (Error: {e})"