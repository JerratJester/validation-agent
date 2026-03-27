from pydantic import BaseModel
from typing import Optional

class UserProfile(BaseModel):
    id: str
    email: str
    age: int
    country: str
    name: Optional[str] = None

def validate_user_profile_rules(profile: UserProfile):
    errors = []

    # check email has @
    if "@" not in profile.email:
        errors.append({"field": "email", "message": "Invalid email address"})
    else:
        # check email has valid domain
        parts = profile.email.split("@")
        if len(parts) != 2:
            errors.append({"field": "email", "message": "Invalid email format"})
        else:
            domain = parts[1]
            if "." not in domain or domain.endswith("."):
                errors.append({"field": "email", "message": "Invalid email format"})

    # check age is between 13 and 120
    if profile.age < 13 or profile.age > 120:
        errors.append({"field": "age", "message": "Age must be between 13 and 120"})

    # check country is valid
    valid_countries = ["US", "IN", "UK"]
    if profile.country not in valid_countries:
        errors.append({"field": "country", "message": f"Country must be one of US, IN, UK. Got {profile.country}"})

    # check name length if provided
    if profile.name is not None:
        if len(profile.name) < 2:
            errors.append({"field": "name", "message": "Name invalid "})
        if len(profile.name) > 50:
            errors.append({"field": "name", "message": "Name invalid"})

    return errors