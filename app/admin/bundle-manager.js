"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function BundleManager() {
  const [bundles, setBundles] = useState([])
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])

  const [bundleName, setBundleName] = useState("")
  const [bundleFee, setBundleFee] = useState("")
  const [category, setCategory] = useState("")
  const [subtype, setSubtype] = useState("")
  const [selectedEvents, setSelectedEvents] = useState([])
  const [active, setActive] = useState(true)

  useEffect(() => {
    fetchBundles()
    fetchEvents()
  }, [])

  useEffect(() => {
    if (category && subtype) {
      const filtered = events.filter(
        (event) =>
          event.exam_category === category &&
          event.exam_subtype === subtype
      )
      setFilteredEvents(filtered)
      setSelectedEvents([])
    }
  }, [category, subtype])

  const fetchBundles = async () => {
    const { data } = await supabase
      .from("anse_bundles")
      .select("*")
      .order("created_at", { ascending: false })

    setBundles(data || [])
  }

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("anse_events")
      .select("*")

    setEvents(data || [])
  }

  const handleCreateBundle = async () => {
    if (!bundleName || !bundleFee || !category || !subtype || selectedEvents.length === 0) {
      alert("All fields required")
      return
    }

    const { data: bundleData, error } = await supabase
      .from("anse_bundles")
      .insert([
        {
          bundle_name: bundleName,
          bundle_fee: parseFloat(bundleFee),
          exam_category: category,
          exam_subtype: subtype,
          active
        }
      ])
      .select()
      .single()

    if (error) {
      alert("Error creating bundle")
      return
    }

    const bundleId = bundleData.id

    const mappings = selectedEvents.map(eventId => ({
      bundle_id: bundleId,
      event_id: eventId
    }))

    await supabase.from("anse_bundle_events").insert(mappings)

    setBundleName("")
    setBundleFee("")
    setCategory("")
    setSubtype("")
    setSelectedEvents([])
    setActive(true)

    fetchBundles()
  }

  const handleDelete = async (id) => {
    await supabase.from("anse_bundles").delete().eq("id", id)
    fetchBundles()
  }

  const toggleEventSelection = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId))
    } else {
      setSelectedEvents([...selectedEvents, eventId])
    }
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Bundle Management</h3>

      <h4>Create Bundle</h4>

      <input
        placeholder="Bundle Name (JEE Dual 2027)"
        value={bundleName}
        onChange={(e) => setBundleName(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        type="number"
        placeholder="Bundle Fee (INR)"
        value={bundleFee}
        onChange={(e) => setBundleFee(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        placeholder="Category (JEE / NEET)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        placeholder="Subtype (Main / Advanced)"
        value={subtype}
        onChange={(e) => setSubtype(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <label style={{ marginRight: 10 }}>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        Active
      </label>

      {filteredEvents.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <strong>Select Events:</strong>
          {filteredEvents.map(event => (
            <div key={event.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event.id)}
                  onChange={() => toggleEventSelection(event.id)}
                />
                {event.title}
              </label>
            </div>
          ))}
        </div>
      )}

      <button style={{ marginTop: 10 }} onClick={handleCreateBundle}>
        Create Bundle
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h4>Existing Bundles</h4>

      {bundles.map(bundle => (
        <div key={bundle.id} style={{ marginBottom: 10 }}>
          <strong>{bundle.bundle_name}</strong> — ₹{bundle.bundle_fee}  
          | {bundle.exam_category} - {bundle.exam_subtype}  
          | {bundle.active ? "Active" : "Inactive"}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => handleDelete(bundle.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}