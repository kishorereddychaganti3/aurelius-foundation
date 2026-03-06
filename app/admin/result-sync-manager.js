"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ResultSyncManager() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [mcqExamId, setMcqExamId] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("anse_events")
      .select("*")

    setEvents(data || [])
  }

  const handleSync = async () => {
    if (!selectedEvent || !mcqExamId) {
      alert("Select event and enter MCQ exam_id")
      return
    }

    const response = await fetch("/api/sync-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: selectedEvent,
        mcqExamId
      })
    })

    const data = await response.json()

    if (data.success) {
      setMessage(`Synced ${data.total} results successfully.`)
    } else {
      setMessage("Sync failed: " + data.error)
    }
  }
const publishResults = async () => {
  if (!selectedEvent) {
    alert("Select event first")
    return
  }

  const { error } = await supabase
    .from("anse_results")
    .update({ published: true })
    .eq("event_id", selectedEvent)

  if (error) {
    setMessage("Publish failed: " + error.message)
  } else {
    setMessage("Results published successfully.")
  }
}
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Sync Results From MCQ</h3>

      <select
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">Select Event</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Enter MCQ exam_id"
        value={mcqExamId}
        onChange={(e) => setMcqExamId(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <button
        style={{ marginLeft: 10 }}
        onClick={handleSync}
      >
        Sync Results
      </button>
<button
  style={{ marginLeft: 10 }}
  onClick={publishResults}
>
  Publish Results
</button>
      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  )
}