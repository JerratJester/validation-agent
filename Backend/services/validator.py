import json
import time
import datetime
from schemas import SCHEMA_REGISTRY
from pydantic import ValidationError


def validate(schema, payload):

    # invalid schema
    if schema not in SCHEMA_REGISTRY:
        return {"ok": False, "errors": [{"field": "schema", "message": "Invalid schema name"}]}

    model, rule_fn = SCHEMA_REGISTRY[schema]

    # layer 1 - pydantic checks types and required fields
    try:
        valid = model(**payload)
    except ValidationError as e:
        errors = [{"field": str(err["loc"][0]), "message": err["msg"]} for err in e.errors()]
        return {"ok": False, "errors": errors, "warnings": [], "summary": {}}

    # layer 2 - business rules
    errors = rule_fn(valid)

    # fake delay
    time.sleep(0.25)

    # log it
    with open("data/logs.jsonl", "a") as f:
        f.write(json.dumps({"schema": schema, "ok": not errors, "latency_ms": 250, "timestamp": datetime.datetime.now().isoformat()}) + "\n")

    return {
        "ok": not errors,
        "errors": errors,
        "warnings": [],
        "summary": vars(valid),
        "latency_ms": 250,
        "timestamp": datetime.datetime.now().isoformat()
    }