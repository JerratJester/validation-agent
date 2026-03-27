import { useState } from "react"

export default function SavedPayloads({ payloads, onSave, onLoad, onDelete, onUpdate }) {
  const [name, setName] = useState("")

  function handleSave() {
    if (!name.trim()) return
    onSave(name)
    setName("")
  }

  return (
    <div>
      <strong>Saved Payloads</strong>
      <div style={{ display: "flex", gap: "8px", margin: "8px 0" }}>
        <input placeholder="Name..." value={name} onChange={e => setName(e.target.value)} />
        <button onClick={handleSave}>Save</button>
      </div>
      {payloads.map(p => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
          <div>
            <div>{p.name}</div>
            <div style={{ fontSize: "12px", color: "gray" }}>{p.schema}</div>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={() => onLoad(p)}>Load</button>
            <button onClick={() => onUpdate(p.id)}>Update</button>
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}