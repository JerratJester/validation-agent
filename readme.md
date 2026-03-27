# Validation Agent

A JSON validation tool built with React and FastAPI.

## Running the Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Running the Frontend
```bash
cd frontend
npm install
npm start
```

## Running Tests
```bash
cd frontend
npm test
```

## Assumptions
- Fixed 250ms latency instead of random 
- Basic email validation — checks for @ and valid domain
- Country restricted to US, IN, UK as specified
- Name if provided must be 2-50 characters


## Design Decisions
- Two layer validation — Pydantic for types, rule functions for business logic
- All API calls in one file so tests only need to mock one place
- Schema registry makes adding new schemas a one file change
- Used Pydantic for schema validation because it comes bundled with FastAPI