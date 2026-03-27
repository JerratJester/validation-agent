from fastapi import APIRouter, HTTPException
import json

router = APIRouter()
FILE = "data/payloads.json"

def read_payloads():
    try:
        with open(FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def write_payloads(payloads):
    with open(FILE, "w") as f:
        json.dump(payloads, f, indent=2)

@router.get("/payloads")
async def list_payloads():
    return {"payloads": read_payloads()}

@router.post("/payloads")
async def create_payload(request: dict):
    payloads = read_payloads()
    new_payload = {"id": max((p["id"] for p in payloads), default=0) + 1, "name": request["name"], "schema": request["schema"], "payload": request["payload"]}
    payloads.append(new_payload)
    write_payloads(payloads)
    return new_payload

@router.put("/payloads/{id}")
async def update_payload(id: int, request: dict):
    payloads = read_payloads()
    for p in payloads:
        if p["id"] == id:
            p["schema"] = request["schema"]
            p["payload"] = request["payload"]
            write_payloads(payloads)
            return p
    raise HTTPException(status_code=404, detail="Payload not found")

@router.delete("/payloads/{id}")
async def delete_payload(id: int):
    payloads = read_payloads()
    for i, p in enumerate(payloads):
        if p["id"] == id:
            del payloads[i]
            write_payloads(payloads)
            return {"message": "Payload deleted"}
    raise HTTPException(status_code=404, detail="Payload not found")