"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function CertificatePage(){

const [email,setEmail] = useState("")
const [result,setResult] = useState(null)

async function search(){

const {data} = await supabase
.from("anse_mock_results")
.select("*")
.eq("email",email)
.single()

setResult(data)

}

return(

<div style={{padding:"60px 20px",textAlign:"center"}}>

<h1>Download Your Certificate</h1>

<p>Enter the email used for the ANSE Free Grand Test.</p>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Enter your email"
style={{
padding:12,
width:300,
marginTop:20
}}
/>

<br/><br/>

<button
onClick={search}
style={{
padding:"12px 30px",
background:"#1e3a8a",
color:"white",
border:"none",
borderRadius:6
}}

>

Search </button>

{result && (

<div style={{marginTop:40}}>

<h3>{result.student_name}</h3>
<p>Rank: {result.rank}</p>

<a
href={`/certificate/view?id=${result.id}`}
style={{
display:"inline-block",
marginTop:20,
padding:"12px 30px",
background:"#facc15",
color:"#111",
textDecoration:"none"
}}

>

Download Certificate </a>

</div>

)}

</div>

)

}
