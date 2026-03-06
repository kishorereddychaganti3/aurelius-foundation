"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function SettingsManager() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single()

    setSettings(data)
    setLoading(false)
  }

  const handleSave = async () => {
    await supabase
      .from("site_settings")
      .update({
        anse_banner_enabled: settings.anse_banner_enabled,
        banner_text: settings.banner_text,
        registration_link: settings.registration_link,
        updated_at: new Date()
      })
      .eq("id", settings.id)

    alert("Settings Updated")
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Site Settings</h3>

      <label>
        <input
          type="checkbox"
          checked={settings.anse_banner_enabled}
          onChange={(e) =>
            setSettings({
              ...settings,
              anse_banner_enabled: e.target.checked
            })
          }
        />
        Enable ANSE Banner
      </label>

      <div style={{ marginTop: 10 }}>
        <input
          style={{ width: "100%", marginBottom: 10 }}
          placeholder="Banner Text"
          value={settings.banner_text || ""}
          onChange={(e) =>
            setSettings({ ...settings, banner_text: e.target.value })
          }
        />

        <input
          style={{ width: "100%" }}
          placeholder="Registration Link (e.g. /register)"
          value={settings.registration_link || ""}
          onChange={(e) =>
            setSettings({
              ...settings,
              registration_link: e.target.value
            })
          }
        />
      </div>

      <button style={{ marginTop: 10 }} onClick={handleSave}>
        Save Settings
      </button>
    </div>
  )
}