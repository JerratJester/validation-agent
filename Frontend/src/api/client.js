const BASE_URL = "http://localhost:8000"

export async function validatePayload(schema, payload) {
    const response = await fetch(`${BASE_URL}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schema, payload })
    })
    return response.json()
}

export async function getPayloads() {
    const response = await fetch(`${BASE_URL}/payloads`)
    return response.json()
}

export async function savePayload(name, schema, payload) {
    const response = await fetch(`${BASE_URL}/payloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, schema, payload })
    })
    return response.json()
}

export async function updatePayload(id, schema, payload) {
    const response = await fetch(`${BASE_URL}/payloads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schema, payload })
    })
    return response.json()
}

export async function deletePayload(id) {
    const response = await fetch(`${BASE_URL}/payloads/${id}`, {
        method: "DELETE"
    })
    return response.json()
}