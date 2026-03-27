export default function ResultsPanel({ result }) {
  return (
    <div>
      <div style={{ padding: "10px", background: result.ok ? "green" : "red", color: "white", borderRadius: "4px" }}>
        {result.ok ? "PASS" : "FAIL"}
      </div>
      {result.errors.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          <strong>Errors</strong>
          {result.errors.map((e, i) => (
            <div key={i} style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
              <code>{e.field}</code> — {e.message}
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "12px" }}>
        <strong>Summary</strong>
        <pre style={{ fontSize: "13px" }}>{JSON.stringify(result.summary, null, 2)}</pre>
      </div>
    </div>
  )
}