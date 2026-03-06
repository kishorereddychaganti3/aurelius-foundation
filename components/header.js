"use client"

import Link from "next/link"

export default function Header(){

return(

<div>

{/* GOLD SCHOLARSHIP RIBBON */}

<div style={{
background:"linear-gradient(90deg,#facc15,#fde68a,#facc15)",
textAlign:"center",
padding:"6px 10px",
fontWeight:600,
fontSize:14
}}>
₹1 Crore National Scholarship Examination • Registrations Open
</div>

{/* MAIN HEADER */}

<header style={{
position:"sticky",
top:0,
zIndex:1000,
background:"white",
borderBottom:"1px solid #e5e7eb"
}}>

<div style={{
maxWidth:1200,
margin:"0 auto",
padding:"16px 20px",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

{/* LOGO */}

<Link href="/" style={{
fontWeight:700,
fontSize:20,
textDecoration:"none",
color:"#1e3a8a"
}}>
Aurelius Foundation
</Link>

{/* NAVIGATION */}

<nav style={{
display:"flex",
alignItems:"center",
gap:22
}}>

<Link href="/" style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}>
Home
</Link>

<Link href="/about" style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}>
About
</Link>
<Link href="/#scholarships" style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}>
Scholarships
</Link>

<Link href="/prize-rules" style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}>
Prize Rules
</Link>

<Link href="/results" style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}>
Results
</Link>

<a
href="https://app.aureliusfoundation.org"
style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}

>

Practice Exams </a>

<Link href="/status" style={{
textDecoration:"none",
color:"#333",
fontWeight:500
}}>
Registration Status
</Link>


{/* REGISTER BUTTON */}

<Link
href="/register"
style={{
background:"#1e3a8a",
color:"white",
padding:"10px 20px",
borderRadius:8,
textDecoration:"none",
fontWeight:600,
boxShadow:"0 0 14px rgba(30,58,138,0.4)",
transition:"all 0.25s"
}}
>
Register
</Link>

</nav>

</div>

</header>

</div>

)

}
