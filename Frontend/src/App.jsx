import { useState, useEffect } from "react"
import ValidationForm from "./components/ValidationForm"
import ResultsPanel from "./components/ResultsPanel"
import SavedPayloads from "./components/SavedPayloads"
import { validatePayload, getPayloads, savePayload, deletePayload, updatePayload } from "./api/client"

export default function App() {
  const [json, setJson] = useState("")
  const [schema, setSchema] = useState("user_profile")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [payloads, setPayloads] = useState([])

  useEffect(() => { fetchPayloads() }, [])

  async function fetchPayloads() {
    const data = await getPayloads()
    setPayloads(data.payloads)
  }

  async function handleValidate() {
    setError(null)
    setResult(null)
    try {
      const parsed = JSON.parse(json)
      setLoading(true)
      const data = await validatePayload(schema, parsed)
      setResult(data)
    } catch (e) {
      setError("Invalid JSON — please check your input")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(name) {
    try {
      const parsed = JSON.parse(json)
      await savePayload(name, schema, parsed)
      fetchPayloads()
    } catch (e) {
      setError("Invalid JSON — cannot save")
    }
  }

  async function handleLoad(payload) {
    setJson(JSON.stringify(payload.payload, null, 2))
    setSchema(payload.schema)
    setResult(null)
  }

  async function handleDelete(id) {
    await deletePayload(id)
    fetchPayloads()
  }

  async function handleUpdate(id) {
    try {
      const parsed = JSON.parse(json)
      await updatePayload(id, schema, parsed)
      fetchPayloads()
    } catch (e) {
      setError("Invalid JSON — cannot update")
    }
  }

 return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <textarea
          aria-label="JSON"
          value={json}
          onChange={e => setJson(e.target.value)}
          rows={20}
          style={{ width: "100%", fontFamily: "monospace", fontSize: "13px" }}
          placeholder="Paste JSON here..."
        />
        <ValidationForm schema={schema} setSchema={setSchema} onValidate={handleValidate} loading={loading} />
        {error && <div role="alert" style={{ color: "red", border: "1px solid red", padding: "8px", borderRadius: "4px" }}>{error}</div>}
        {result && <ResultsPanel result={result} />}
      </div>
      <SavedPayloads payloads={payloads} onSave={handleSave} onLoad={handleLoad} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  )
}