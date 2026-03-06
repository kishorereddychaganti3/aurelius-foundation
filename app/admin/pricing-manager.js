"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function PricingManager() {
  const [events, setEvents] = useState([])
  const [tiers, setTiers] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [tierName, setTierName] = useState("")
  const [fee, setFee] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [active, setActive] = useState(true)

  useEffect(() => {
    fetchEvents()
    fetchTiers()
  }, [])

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("anse_events")
      .select("*")
      .order("year", { ascending: false })

    setEvents(data || [])
  }

  const fetchTiers = async () => {
    const { data } = await supabase
      .from("anse_pricing_tiers")
      .select("*, anse_events(title)")
      .order("created_at", { ascending: false })

    setTiers(data || [])
  }

  const handleCreateTier = async () => {
    if (!selectedEvent || !tierName || !fee || !startDate || !endDate) {
      alert("All fields required")
      return
    }

    await supabase.from("anse_pricing_tiers").insert([
      {
        event_id: selectedEvent,
        tier_name: tierName,
        fee_amount: parseFloat(fee),
        start_date: startDate,
        end_date: endDate,
        active
      }
    ])

    setTierName("")
    setFee("")
    setStartDate("")
    setEndDate("")
    setActive(true)

    fetchTiers()
  }

  const handleDelete = async (id) => {
    await supabase
      .from("anse_pricing_tiers")
      .delete()
      .eq("id", id)

    fetchTiers()
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Pricing Tier Management</h3>

      <h4>Create Pricing Tier</h4>

      <select
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
        style={{ marginRight: 10 }}
      >
        <option value="">Select Event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Tier Name (Early Bird)"
        value={tierName}
        onChange={(e) => setTierName(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        type="number"
        placeholder="Fee (INR)"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
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

      <button onClick={handleCreateTier}>Create Tier</button>

      <hr style={{ margin: "20px 0" }} />

      <h4>Existing Pricing Tiers</h4>

      {tiers.map((tier) => (
        <div key={tier.id} style={{ marginBottom: 10 }}>
          <strong>{tier.tier_name}</strong> | ₹{tier.fee_amount} |
          {tier.anse_events?.title} |
          {tier.start_date} → {tier.end_date} |
          {tier.active ? "Active" : "Inactive"}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => handleDelete(tier.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}