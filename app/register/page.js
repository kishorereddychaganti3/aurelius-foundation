"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function RegisterPage() {
  const [events, setEvents] = useState([])
  const [bundles, setBundles] = useState([])
  const [categories, setCategories] = useState([])
  const [subtypes, setSubtypes] = useState([])

  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubtype, setSelectedSubtype] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [price, setPrice] = useState(null)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: eventData } = await supabase
      .from("anse_events")
      .select("*")
      .eq("registration_open", true)

    const { data: bundleData } = await supabase
      .from("anse_bundles")
      .select("*")
      .eq("active", true)

    setEvents(eventData || [])
    setBundles(bundleData || [])

    const uniqueCategories = [
      ...new Set((eventData || []).map(e => e.exam_category))
    ]

    setCategories(uniqueCategories)
    setLoading(false)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedSubtype("")
    setSelectedType("")
    setSelectedItem(null)
    setPrice(null)
    setMessage("")

    const filteredSubtypes = [
      ...new Set(
        events
          .filter(e => e.exam_category === category)
          .map(e => e.exam_subtype)
      )
    ]

    setSubtypes(filteredSubtypes)
  }

  const handleSubtypeChange = (subtype) => {
    setSelectedSubtype(subtype)
    setSelectedType("")
    setSelectedItem(null)
    setPrice(null)
    setMessage("")
  }

  const fetchPricingForEvent = async (event) => {
    const today = new Date().toISOString().split("T")[0]

    const { data: tiers } = await supabase
      .from("anse_pricing_tiers")
      .select("*")
      .eq("event_id", event.id)
      .eq("active", true)

    const currentTier = tiers?.find(
      tier => today >= tier.start_date && today <= tier.end_date
    )

    if (currentTier) {
      setPrice(currentTier.fee_amount)
    } else {
      setPrice(null)
    }
  }

  const handleSelection = async (type, item) => {
    setSelectedType(type)
    setSelectedItem(item)
    setMessage("")

    if (type === "event") {
      await fetchPricingForEvent(item)
    }

    if (type === "bundle") {
      setPrice(item.bundle_fee)
    }
  }

  const handleRegister = async () => {
    setMessage("")

    if (!selectedItem) {
      alert("Please select an exam or bundle")
      return
    }

    if (!price) {
      alert("Registration is currently closed or pricing not available")
      return
    }

    if (!fullName || !email || !phone) {
      alert("All fields required")
      return
    }

    // Get safe registration sequence
    const { data: seqData, error: seqError } =
      await supabase.rpc("get_next_registration_number")

    if (seqError) {
      alert("Error generating registration number")
      return
    }

    const sequence = seqData

    const year =
      selectedType === "event"
        ? selectedItem.year
        : new Date().getFullYear()

    const registrationNumber =
      `R${year}${String(sequence).padStart(6, "0")}`

    try {
      if (selectedType === "event") {
        const { error } = await supabase
          .from("anse_registrations")
          .insert([
            {
              event_id: selectedItem.id,
              registration_number: registrationNumber,
              full_name: fullName,
              email,
              phone,
              payment_mode: "online",
              payment_status: "pending_payment"
            }
          ])

        if (error) throw error
      }

      if (selectedType === "bundle") {
        const { data: mappings, error: mapError } =
          await supabase
            .from("anse_bundle_events")
            .select("*")
            .eq("bundle_id", selectedItem.id)

        if (mapError) throw mapError

        if (!mappings || mappings.length === 0) {
          alert("Bundle configuration error")
          return
        }

        const inserts = mappings.map(map => ({
          event_id: map.event_id,
          registration_number: registrationNumber,
          full_name: fullName,
          email,
          phone,
          payment_mode: "online",
          payment_status: "pending_payment"
        }))

        const { error } = await supabase
          .from("anse_registrations")
          .insert(inserts)

        if (error) throw error
      }

      setMessage(
        `Registration successful. Your Registration Number is ${registrationNumber}.`
      )

      setFullName("")
      setEmail("")
      setPhone("")
    } catch (err) {
      alert("Registration failed: " + err.message)
    }
  }

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>

  const filteredEvents = events.filter(
    e =>
      e.exam_category === selectedCategory &&
      e.exam_subtype === selectedSubtype
  )

  const filteredBundles = bundles.filter(
    b =>
      b.exam_category === selectedCategory &&
      b.exam_subtype === selectedSubtype
  )

  return (
    <div style={{ padding: 40, maxWidth: 700 }}>
      <h2>ANSE Registration Portal</h2>

      <h3>Select Category</h3>
      {categories.map(cat => (
        <div key={cat}>
          <label>
            <input
              type="radio"
              name="category"
              onChange={() => handleCategoryChange(cat)}
            />
            {cat}
          </label>
        </div>
      ))}

      {selectedCategory && (
        <>
          <h3 style={{ marginTop: 20 }}>Select Subtype</h3>
          {subtypes.map(sub => (
            <div key={sub}>
              <label>
                <input
                  type="radio"
                  name="subtype"
                  onChange={() => handleSubtypeChange(sub)}
                />
                {sub}
              </label>
            </div>
          ))}
        </>
      )}

      {selectedSubtype && (
        <>
          <h3 style={{ marginTop: 20 }}>Individual Events</h3>
          {filteredEvents.map(event => (
            <div key={event.id}>
              <label>
                <input
                  type="radio"
                  name="selection"
                  onChange={() => handleSelection("event", event)}
                />
                {event.title}
              </label>
            </div>
          ))}

          {filteredBundles.length > 0 && (
            <>
              <h3 style={{ marginTop: 20 }}>Bundles</h3>
              {filteredBundles.map(bundle => (
                <div key={bundle.id}>
                  <label>
                    <input
                      type="radio"
                      name="selection"
                      onChange={() => handleSelection("bundle", bundle)}
                    />
                    {bundle.bundle_name} — ₹{bundle.bundle_fee}
                  </label>
                </div>
              ))}
            </>
          )}
        </>
      )}

      {price && (
        <p style={{ marginTop: 20 }}>
          Payable Amount: <strong>₹{price}</strong>
        </p>
      )}

      {selectedItem && (
        <>
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ display: "block", marginBottom: 10, width: "100%" }}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: 10, width: "100%" }}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ display: "block", marginBottom: 10, width: "100%" }}
          />

          <button onClick={handleRegister}>
            Proceed to Registration (₹{price})
          </button>
        </>
      )}

      {message && (
        <p style={{ marginTop: 20, color: "green" }}>
          {message}
        </p>
      )}
    </div>
  )
}