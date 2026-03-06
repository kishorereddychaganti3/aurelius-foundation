"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function RegistrationStatus() {
  const [regNumber, setRegNumber] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCheck = async () => {
    if (!regNumber) {
      alert("Enter registration number")
      return
    }

    setLoading(true)
    setError("")
    setResults([])

    const { data, error } = await supabase
      .from("anse_registrations")
      .select(`
        *,
        anse_events (
          title,
          exam_category,
          exam_subtype
        )
      `)
      .eq("registration_number", regNumber)

    if (error || !data || data.length === 0) {
      setError("Registration not found")
      setLoading(false)
      return
    }

    setResults(data)
    setLoading(false)
  }

  return (
    <div style={{ padding: 40, maxWidth: 700 }}>
      <h2>ANSE Registration Status</h2>

      <input
        placeholder="Enter Registration Number"
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
        style={{
          display: "block",
          width: "100%",
          marginBottom: 10
        }}
      />

      <button onClick={handleCheck}>
        Check Status
      </button>

      {loading && <p>Checking...</p>}

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: 20, border: "1px solid #ddd", padding: 20 }}>
          <p><strong>Name:</strong> {results[0].full_name}</p>
          <p><strong>Email:</strong> {results[0].email}</p>
          <p><strong>Registration Number:</strong> {results[0].registration_number}</p>
          <p>
            <strong>Registered On:</strong>{" "}
            {new Date(results[0].created_at).toLocaleDateString()}
          </p>

          <hr style={{ margin: "20px 0" }} />

          <h4>Registered Events</h4>

          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Subtype</th>
                <th>Roll Number</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.id}>
                  <td>{item.anse_events?.title}</td>
                  <td>{item.anse_events?.exam_category}</td>
                  <td>{item.anse_events?.exam_subtype}</td>
                  <td>
                    {item.roll_number
                      ? item.roll_number
                      : "Not yet generated"}
                  </td>
                  <td>{item.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}