"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function EventManager() {
  const [events, setEvents] = useState([])
  const [year, setYear] = useState("")
  const [title, setTitle] = useState("")
  const [examDate, setExamDate] = useState("")
  const [registrationOpen, setRegistrationOpen] = useState(true)
  const [category, setCategory] = useState("")
  const [subtype, setSubtype] = useState("")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("anse_events")
      .select("*")
      .order("created_at", { ascending: false })

    setEvents(data || [])
  }

  const handleCreate = async () => {
    if (!year || !title || !category || !subtype) {
      alert("Year, Title, Category, Subtype required")
      return
    }

    await supabase.from("anse_events").insert([
      {
        year: parseInt(year),
        title,
        exam_date: examDate || null,
        registration_open: registrationOpen,
        status: "upcoming",
        exam_category: category,
        exam_subtype: subtype
      }
    ])

    setYear("")
    setTitle("")
    setExamDate("")
    setRegistrationOpen(true)
    setCategory("")
    setSubtype("")

    fetchEvents()
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Manage ANSE Events</h3>

      <h4>Create New Event</h4>

      <input
        placeholder="Year (e.g. 2027)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        placeholder="Title (e.g. JEE Main Session 1 2027)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        placeholder="Category (JEE / NEET)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        placeholder="Subtype (Main / Advanced / UG)"
        value={subtype}
        onChange={(e) => setSubtype(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <label style={{ marginRight: 10 }}>
        <input
          type="checkbox"
          checked={registrationOpen}
          onChange={(e) => setRegistrationOpen(e.target.checked)}
        />
        Registration Open
      </label>

      <button onClick={handleCreate}>Create Event</button>

      <hr style={{ margin: "20px 0" }} />

      <h4>Existing Events</h4>

      {events.map((event) => (
        <div key={event.id} style={{ marginBottom: 10 }}>
          <strong>{event.title}</strong> ({event.year})  
          | {event.exam_category} - {event.exam_subtype}  
          | Exam Date: {event.exam_date || "Not set"}  
          | Registration: {event.registration_open ? "Open" : "Closed"}
        </div>
      ))}
    </div>
  )
}