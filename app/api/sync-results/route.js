import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req) {
  try {
    const { eventId, mcqExamId } = await req.json()

    if (!eventId || !mcqExamId) {
      return NextResponse.json(
        { error: "Missing eventId or mcqExamId" },
        { status: 400 }
      )
    }

    // MCQ project connection
    const mcqClient = createClient(
      process.env.MCQ_SUPABASE_URL,
      process.env.MCQ_SERVICE_ROLE_KEY
    )

    // Foundation project connection
  const foundationClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
    // Fetch sessions from MCQ
    const { data: sessions, error: sessionError } =
      await mcqClient
        .from("exam_sessions")
        .select(`
          score,
          proctor_status,
          exam_id,
          students (
            roll_number
          )
        `)
        .eq("exam_id", mcqExamId)
        .eq("submitted", true)

    if (sessionError) throw sessionError

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ message: "No sessions found" })
    }

    // Prepare insert data
    const inserts = sessions.map(s => ({
      event_id: eventId,
      roll_number: s.students?.roll_number,
      marks: s.proctor_status === "approved" ? s.score : 0,
      approval_status: s.proctor_status,
      published: false
    }))

    // Clear previous results for this event
    await foundationClient
      .from("anse_results")
      .delete()
      .eq("event_id", eventId)

    const { error: insertError } =
      await foundationClient
        .from("anse_results")
        .insert(inserts)

    if (insertError) throw insertError

    // Rank calculation (only approved)
    const { data: approved } =
      await foundationClient
        .from("anse_results")
        .select("*")
        .eq("event_id", eventId)
        .eq("approval_status", "approved")
        .order("marks", { ascending: false })

    for (let i = 0; i < approved.length; i++) {
      await foundationClient
        .from("anse_results")
        .update({ rank: i + 1 })
        .eq("id", approved[i].id)
    }

    return NextResponse.json({
      success: true,
      total: sessions.length
    })

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}