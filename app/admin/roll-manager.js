"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function RollManager() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("anse_events")
      .select("*")
      .order("year", { ascending: false })

    setEvents(data || [])
  }

  const generateRollNumbers = async () => {
    if (!selectedEvent) {
      alert("Select event")
      return
    }

    setMessage("Generating roll numbers...")

    const { data: registrations } = await supabase
      .from("anse_registrations")
      .select(`
        id,
        registration_number,
        anse_events (
          year,
          exam_category,
          exam_subtype
        )
      `)
      .eq("event_id", selectedEvent)
      .is("roll_number", null)
      .order("created_at", { ascending: true })

    if (!registrations || registrations.length === 0) {
      setMessage("No registrations pending roll number generation.")
      return
    }

    const eventInfo = registrations[0].anse_events

    const yearShort = String(eventInfo.year).slice(-2)
    const categoryCode = eventInfo.exam_category[0].toUpperCase()
    const subtypeCode = eventInfo.exam_subtype[0].toUpperCase()

    for (let i = 0; i < registrations.length; i++) {
      const sequence = String(i + 1).padStart(4, "0")

      const rollNumber =
        `ANSE-${categoryCode}${yearShort}${subtypeCode}-${sequence}`

      await supabase
        .from("anse_registrations")
        .update({ roll_number: rollNumber })
        .eq("id", registrations[i].id)
    }

    setMessage("Roll numbers generated successfully.")
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Roll Number Generation</h3>

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

      <button
        style={{ marginLeft: 10 }}
        onClick={generateRollNumbers}
      >
        Generate Roll Numbers
      </button>

      {message && (
        <p style={{ marginTop: 15 }}>{message}</p>
      )}
    </div>
  )
}