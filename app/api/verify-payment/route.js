import crypto from "crypto"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationNumber,
    } = await req.json()

    const body =
      razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }

    // Supabase service client (server-side safe)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    await supabase
      .from("anse_registrations")
      .update({
        payment_status: "paid",
        razorpay_order_id,
        razorpay_payment_id,
      })
      .eq("registration_number", registrationNumber)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    )
  }
}