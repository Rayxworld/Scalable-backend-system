from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import database
import requests

app = FastAPI()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/analytics/summary")
def get_summary(db: Session = Depends(get_db)):
    # In a real scenario, this would aggregate data from other services
    # For now, we simulate by returning a count of events
    event_count = db.query(database.AnalyticsEvent).count()
    
    # Example of cross-service "link" (not actual call since services aren't running)
    return {
        "total_events_tracked": event_count,
        "services_monitored": ["user-service", "product-service"],
        "status": "operational"
    }

@app.post("/analytics/log")
def log_event(event_type: str, description: str, db: Session = Depends(get_db)):
    new_event = database.AnalyticsEvent(event_type=event_type, description=description)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@app.get("/analytics/health")
def health_check():
    return {"status": "healthy"}
