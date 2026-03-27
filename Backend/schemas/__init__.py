from .user_profile import UserProfile, validate_user_profile_rules
from .order import Order, validate_order_rules
SCHEMA_REGISTRY = {
    "user_profile": (UserProfile, validate_user_profile_rules),
    "order": (Order, validate_order_rules),
}