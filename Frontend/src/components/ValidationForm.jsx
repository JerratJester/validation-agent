export default function ValidationForm({ schema, setSchema, onValidate, loading }) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <select aria-label="Schema" value={schema} onChange={e => setSchema(e.target.value)}>
        <option value="user_profile">user_profile</option>
        <option value="order">order</option>
      </select>
      <button onClick={onValidate} disabled={loading}>
        {loading ? "Validating..." : "Validate"}
      </button>
    </div>
  )
}