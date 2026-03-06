"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import EventManager from "./event-manager"
import PricingManager from "./pricing-manager"
import BundleManager from "./bundle-manager"
import SettingsManager from "./settings-manager"
import RegistrationManager from "./registration-manager"
import RollManager from "./roll-manager"
import ResultSyncManager from "./result-sync-manager"

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const currentSession = data.session

      if (!currentSession) {
        setLoading(false)
        return
      }

      setSession(currentSession)

      // Check admin_users table
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", currentSession.user.email)

      if (adminData && adminData.length > 0) {
        setIsAdmin(true)
      }

      setLoading(false)
    }

    init()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/admin"
      }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Login</h2>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Access Denied</h2>
        <p>Logged in email: {session.user.email}</p>
        <p>Your account is not authorized as admin.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome {session.user.email}</p>

      <hr style={{ margin: "20px 0" }} />
<SettingsManager />

<hr style={{ margin: "20px 0" }} />
<EventManager />

<hr style={{ margin: "20px 0" }} />
<PricingManager />

<hr style={{ margin: "20px 0" }} />
<BundleManager />

<RegistrationManager />
<hr style={{ margin: "20px 0" }} />
<hr />
<RollManager />
<hr />
<ResultSyncManager/>

<hr style={{ margin: "20px 0" }} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}