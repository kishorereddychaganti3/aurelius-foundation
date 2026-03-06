"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ResultsPage(){

const [jee,setJee] = useState([])
const [neet,setNeet] = useState([])
const [tab,setTab] = useState("JEE")

const [email,setEmail] = useState("")
const [cert,setCert] = useState(null)
const [loading,setLoading] = useState(false)

useEffect(()=>{

async function load(){

const {data:jeeData} = await supabase
.from("anse_mock_results")
.select("*")
.eq("exam_type","JEE")
.lte("rank",500)
.order("rank")

const {data:neetData} = await supabase
.from("anse_mock_results")
.select("*")
.eq("exam_type","NEET")
.lte("rank",500)
.order("rank")

setJee(jeeData || [])
setNeet(neetData || [])

}

load()

},[])

async function searchCertificate(){

if(!email){
alert("Enter your email")
return
}

setLoading(true)

const {data,error} = await supabase
.from("anse_mock_results")
.select("*")
.eq("email",email)

setLoading(false)

if(error){
console.log(error)
alert("Error fetching certificate")
return
}

if(!data || data.length===0){
alert("Certificate not found")
return
}

setCert(data[0])

}

function rowStyle(rank){

if(rank===1) return {background:"#fef3c7",fontWeight:600}
if(rank===2) return {background:"#e5e7eb",fontWeight:600}
if(rank===3) return {background:"#fcd34d",fontWeight:600}

return {}

}

const rows = tab==="JEE" ? jee : neet

return(


<div style={{padding:"60px 20px"}}>

<div style={{maxWidth:1000,margin:"0 auto"}}>

{/* TITLE */}

<h1 style={{textAlign:"center",marginBottom:10}}>
ANSE 2026 Free Grand Test Results
</h1>

<p style={{
textAlign:"center",
opacity:0.8,
marginBottom:40
}}>
Over <b>18,000 students</b> participated in the national
practice test conducted in January 2026.
</p>

{/* CERTIFICATE SECTION */}

<div style={{
background:"#f8fafc",
padding:40,
borderRadius:10,
marginBottom:50,
textAlign:"center"
}}>

<h2>Download Your Certificate</h2>

<p style={{opacity:0.8}}>
Enter the email used for the ANSE 2026 Free Grand Test.
</p>

<div style={{marginTop:20}}>

<input
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
padding:12,
width:260,
marginRight:10
}}
/>

<button
onClick={searchCertificate}
style={{
padding:"12px 24px",
background:"#1e3a8a",
color:"white",
border:"none",
borderRadius:6,
cursor:"pointer"
}}

>

{loading ? "Searching..." : "Get Certificate"} </button>

</div>

{cert && (

<div style={{marginTop:30}}>

<h3>{cert.student_name}</h3>

<p>
National Rank: <b>{cert.rank}</b>
</p>

<div style={{
border:"6px solid #1e3a8a",
padding:30,
marginTop:20,
display:"inline-block",
background:"white"
}}>

<h2>Aurelius Foundation</h2>

<h3>Certificate of Participation</h3>

<p>This certifies that</p>

<h2>{cert.student_name}</h2>

<p>participated in the</p>

<h3>Aurelius National Scholarship Examination</h3>

<p>Free Grand Test – {cert.exam_year}</p>

<h2>National Rank: {cert.rank}</h2>

<p style={{marginTop:20}}>
Verify Result: aureliusfoundation.org/results
</p>

</div>

<div style={{marginTop:20}}>

<button
onClick={()=>window.print()}
style={{
padding:"10px 22px",
marginRight:10,
background:"#111",
color:"white",
border:"none",
borderRadius:6
}}

>

Download / Print </button>

<a
href="https://www.facebook.com/sharer/sharer.php?u=https://aureliusfoundation.org/results"
target="_blank"
style={{
padding:"10px 22px",
background:"#1877F2",
color:"white",
borderRadius:6,
textDecoration:"none",
marginRight:10
}}

>

Share Facebook </a>

<a
href="https://www.instagram.com/"
target="_blank"
style={{
padding:"10px 22px",
background:"#E1306C",
color:"white",
borderRadius:6,
textDecoration:"none"
}}

>

Share Instagram </a>

</div>

</div>

)}

</div>

{/* TAB SWITCH */}

<div style={{
display:"flex",
justifyContent:"center",
gap:10,
marginBottom:30
}}>

<button
onClick={()=>setTab("JEE")}
style={{
padding:"10px 22px",
border:"none",
borderRadius:8,
cursor:"pointer",
background:tab==="JEE"?"#1e3a8a":"#e5e7eb",
color:tab==="JEE"?"white":"#333"
}}

>

JEE Top 500 </button>

<button
onClick={()=>setTab("NEET")}
style={{
padding:"10px 22px",
border:"none",
borderRadius:8,
cursor:"pointer",
background:tab==="NEET"?"#1e3a8a":"#e5e7eb",
color:tab==="NEET"?"white":"#333"
}}

>

NEET Top 500 </button>

</div>

{/* LEADERBOARD */}

<table style={{
width:"100%",
borderCollapse:"collapse",
background:"white",
boxShadow:"0 4px 14px rgba(0,0,0,0.06)"
}}>


<thead>
<tr style={{
background:"#1e3a8a",
color:"white",
textAlign:"center"
}}>
<th style={{padding:"14px"}}>Rank</th>
<th>Student</th>
<th>City</th>
<th>Score</th>
</tr>
</thead>
<tbody>

{rows.map(r=>(

<tr
key={r.id}
style={{
borderBottom:"1px solid #eee",
textAlign:"center",
cursor:"pointer",
...rowStyle(r.rank)
}}
>

<td style={{padding:"14px",fontWeight:600}}>
{r.rank===1 && "🥇 "}
{r.rank===2 && "🥈 "}
{r.rank===3 && "🥉 "}
{r.rank>3 && r.rank}
</td>

<td style={{padding:"14px"}}>
{r.student_name}
</td>

<td style={{padding:"14px"}}>
{r.city}
</td>

<td style={{padding:"14px",fontWeight:600}}>
{r.score}
</td>

</tr>

))}

</tbody>

</table>

{/* CTA */}

<div style={{
textAlign:"center",
marginTop:60
}}>

<h2>Compete in ANSE 2027</h2>

<p style={{opacity:0.8,marginBottom:25}}>
Register for the Aurelius National Scholarship Examination
and compete for the ₹1 Crore scholarship prize pool.
</p>

<a
href="/register"
style={{
background:"#1e3a8a",
color:"white",
padding:"14px 32px",
borderRadius:8,
textDecoration:"none",
fontWeight:600
}}

>

Register Now </a>

</div>

</div>

</div>

)

}
