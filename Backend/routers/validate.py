from fastapi import APIRouter
from services.validator import validate

router = APIRouter()

@router.post("/validate")
async def validate_endpoint(request: dict):
    return validate(request["schema"], request["payload"])