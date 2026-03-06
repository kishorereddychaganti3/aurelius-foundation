"use client"

import { useEffect, useState } from "react"
import Footer from "../components/footer"

export default function HomePage() {

const [counter,setCounter] = useState(18472)

useEffect(()=>{

const interval = setInterval(()=>{
setCounter(c=>c+Math.floor(Math.random()*3))
},3000)

return ()=>clearInterval(interval)

},[])

return (
<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.6, background:"#f6f7fb" }}>

{/* HERO */}

<section style={{
background:"linear-gradient(135deg,#0f172a,#1e3a8a)",
color:"white",
padding:"120px 20px",
textAlign:"center"
}}>

<div style={{maxWidth:900,margin:"0 auto"}}>

<h1 style={{fontSize:52,fontWeight:700,marginBottom:10}}>
ANSE 2027
</h1>

<h2 style={{fontSize:24,fontWeight:400,marginBottom:20}}>
Aurelius National Scholarship Examination
</h2>

<div style={{
fontSize:34,
fontWeight:700,
color:"#facc15",
marginBottom:25
}}>
₹1 Crore Scholarship Prize Pool
</div>

<p style={{
maxWidth:650,
margin:"0 auto",
marginBottom:35,
opacity:0.9
}}>
Compete with students across India in a secure AI-proctored
online examination and earn national ranking and scholarships.
</p>

<div style={{
display:"flex",
justifyContent:"center",
gap:20,
flexWrap:"wrap"
}}>

<a href="/register" style={{
background:"#facc15",
color:"#111",
padding:"14px 32px",
borderRadius:8,
textDecoration:"none",
fontWeight:600
}}>
Register for ANSE </a>

<a href="#scholarships" style={{
border:"1px solid white",
padding:"14px 32px",
borderRadius:8,
textDecoration:"none",
color:"white"
}}>
View Scholarships </a>

</div>

</div>

</section>

{/* FREE GRAND TEST */}

<section style={{padding:"80px 20px",background:"#f8fafc"}}>

<div style={{maxWidth:1000,margin:"0 auto",textAlign:"center"}}>

<h2 style={{marginBottom:10}}>
Free National Grand Test
</h2>

<p style={{marginBottom:40,opacity:0.8}}>
Attempt free grand tests and compare your performance
with students across India.
</p>

<div style={{
display:"flex",
justifyContent:"center",
gap:20,
flexWrap:"wrap"
}}>

<a
href="https://app.aureliusfoundation.org/student/login"
style={{
background:"#1e3a8a",
color:"white",
padding:"14px 28px",
borderRadius:8,
textDecoration:"none"
}}

>

Attempt Free Test </a>

<a
href="#leaderboard"
style={{
border:"1px solid #1e3a8a",
padding:"14px 28px",
borderRadius:8,
textDecoration:"none",
color:"#1e3a8a"
}}

>

View Leaderboard </a>

</div>

</div>

</section>

{/* LIVE COUNTER */}

<section style={{
padding:"60px 20px",
textAlign:"center"
}}>

<h2 style={{marginBottom:10}}>
Students Practicing Nationwide
</h2>

<div style={{
fontSize:42,
fontWeight:700,
color:"#1e3a8a"
}}>
{counter.toLocaleString()}+
</div>

<p style={{opacity:0.7}}>
students have attempted the national practice tests
</p>

</section>

{/* SCHOLARSHIP STRUCTURE */}

<section id="scholarships" style={{
padding:"80px 20px",
background:"#f6f7fb"
}}>

<div style={{maxWidth:1000,margin:"0 auto"}}>

<h2 style={{textAlign:"center",marginBottom:40}}>
Scholarship Structure
</h2>

<table style={{
width:"100%",
borderCollapse:"collapse",
background:"white",
borderRadius:10,
overflow:"hidden"
}}>

<tbody>

<tr style={{background:"#fef3c7"}}>
<td style={{padding:15}}>🥇 Rank 1</td>
<td style={{padding:15}}>₹5,00,000</td>
</tr>

<tr style={{background:"#e5e7eb"}}>
<td style={{padding:15}}>🥈 Rank 2</td>
<td style={{padding:15}}>₹3,00,000</td>
</tr>

<tr style={{background:"#fde68a"}}>
<td style={{padding:15}}>🥉 Rank 3</td>
<td style={{padding:15}}>₹2,00,000</td>
</tr>

<tr>
<td style={{padding:15}}>Rank 4 – 10</td>
<td style={{padding:15}}>₹50,000</td>
</tr>

<tr>
<td style={{padding:15}}>Rank 11 – 50</td>
<td style={{padding:15}}>₹10,000</td>
</tr>

<tr>
<td style={{padding:15}}>Rank 51 – 500</td>
<td style={{padding:15}}>₹5,000 Scholarship</td>
</tr>

</tbody>

</table>

</div>

</section>

{/* HALL OF FAME */}

<section style={{
padding:"80px 20px",
textAlign:"center"
}}>

<h2 style={{marginBottom:20}}>
Hall of Fame
</h2>

<p style={{opacity:0.8}}>
Your name could be here.
Compete in ANSE and become one of the national scholars.
</p>

</section>

{/* FINAL CTA */}

<section style={{
background:"linear-gradient(135deg,#1e3a8a,#0f172a)",
color:"white",
padding:"80px 20px",
textAlign:"center"
}}>

<h2 style={{marginBottom:15}}>
Ready to Compete in ANSE 2027?
</h2>

<p style={{marginBottom:30}}>
Join thousands of students across India and compete
for scholarships and national ranking.
</p>

<a
href="/register"
style={{
background:"#facc15",
color:"#111",
padding:"14px 32px",
borderRadius:8,
textDecoration:"none",
fontWeight:600
}}

>

Register Now </a>

</section>

//<Footer/>

</div>

)

}
