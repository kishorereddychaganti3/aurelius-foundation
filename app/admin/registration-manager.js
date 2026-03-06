"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function RegistrationManager() {
  const [registrations, setRegistrations] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
    fetchRegistrations()
  }, [])

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("anse_events")
      .select("*")
      .order("year", { ascending: false })

    setEvents(data || [])
  }

  const fetchRegistrations = async () => {
    setLoading(true)

    let query = supabase
      .from("anse_registrations")
      .select(`
        *,
        anse_events (
          title,
          exam_category,
          exam_subtype
        )
      `)
      .order("created_at", { ascending: false })

    if (selectedEvent) {
      query = query.eq("event_id", selectedEvent)
    }

    if (searchEmail) {
      query = query.ilike("email", `%${searchEmail}%`)
    }

    const { data } = await query

    setRegistrations(data || [])
    setLoading(false)
  }
const exportToCSV = async () => {
  const { data } = await supabase
    .from("anse_registrations")
    .select(`
      registration_number,
      full_name,
      email,
      phone,
      payment_status,
      roll_number,
      created_at,
      anse_events (
        title,
        exam_category,
        exam_subtype
      )
    `)

  if (!data || data.length === 0) {
    alert("No registrations found")
    return
  }

  const rows = data.map(item => ({
    Registration_Number: item.registration_number,
    Name: item.full_name,
    Email: item.email,
    Phone: item.phone,
    Event: item.anse_events?.title,
    Category: item.anse_events?.exam_category,
    Subtype: item.anse_events?.exam_subtype,
    Roll_Number: item.roll_number || "",
    Payment_Status: item.payment_status,
    Registered_On: new Date(item.created_at).toLocaleDateString()
  }))

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [
      Object.keys(rows[0]).join(","),
      ...rows.map(r => Object.values(r).join(","))
    ].join("\n")

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "anse_registrations.csv")
  document.body.appendChild(link)
  link.click()
}
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Registration Management</h3>

      <div style={{ marginBottom: 15 }}>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          style={{ marginRight: 10 }}
        >
          <option value="">All Events</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <button onClick={fetchRegistrations}>
          Filter
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <button
  style={{ marginBottom: 15 }}
  onClick={exportToCSV}
>
  Export CSV
</button>
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Category</th>
                <th>Subtype</th>
                <th>Payment Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(reg => (
                <tr key={reg.id}>
                  <td>{reg.registration_number}</td>
                  <td>{reg.full_name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.anse_events?.title}</td>
                  <td>{reg.anse_events?.exam_category}</td>
                  <td>{reg.anse_events?.exam_subtype}</td>
                  <td>{reg.payment_status}</td>
                  <td>{new Date(reg.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}