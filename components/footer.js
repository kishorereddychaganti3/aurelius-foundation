
export default function Footer() {

return (

<footer style={{
background:"#0f172a",
color:"#cbd5f5",
padding:"60px 20px"
}}>

<div style={{
maxWidth:"1100px",
margin:"0 auto"
}}>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:40
}}>

{/* BRAND */}

<div>

<h3 style={{
color:"white",
marginBottom:10
}}>
Aurelius Foundation
</h3>

<p style={{fontSize:14,lineHeight:1.6}}>
Aurelius Foundation conducts the Aurelius National Scholarship
Examination (ANSE) to recognize academic excellence and provide
scholarship opportunities for students across India.
</p>

</div>

{/* QUICK LINKS */}

<div>

<h4 style={{color:"white",marginBottom:12}}>
Quick Links
</h4>

<div style={{display:"flex",flexDirection:"column",gap:8,fontSize:14}}>

<a href="/" style={{color:"#cbd5f5",textDecoration:"none"}}>
Home </a>

<a href="#scholarships" style={{color:"#cbd5f5",textDecoration:"none"}}>
Scholarships </a>

<a href="#rules" style={{color:"#cbd5f5",textDecoration:"none"}}>
Prize Rules </a>

<a href="/results" style={{color:"#cbd5f5",textDecoration:"none"}}>
Results </a>

<a href="/refund" style={{color:"#cbd5f5",textDecoration:"none"}}>
Refund </a>

<a href="/fair-play" style={{color:"#cbd5f5",textDecoration:"none"}}>
Fair Play </a>


</div>

</div>

{/* EXAMS */}

<div>

<h4 style={{color:"white",marginBottom:12}}>
Examinations
</h4>

<div style={{display:"flex",flexDirection:"column",gap:8,fontSize:14}}>

<a href="/register" style={{color:"#cbd5f5",textDecoration:"none"}}>
ANSE Registration </a>

<a href="/status" style={{color:"#cbd5f5",textDecoration:"none"}}>
Registration Status </a>

<a
href="https://app.aureliusfoundation.org/student/login"
target="_blank"
style={{color:"#cbd5f5",textDecoration:"none"}}

>

Practice Tests </a>

</div>

</div>

{/* CONTACT */}

<div>

<h4 style={{color:"white",marginBottom:12}}>
Contact
</h4>

<div style={{fontSize:14,lineHeight:1.7}}>

<p>Email: support@aureliusfoundation.org</p>

<p>India</p>

</div>

</div>

</div>

{/* BOTTOM BAR */}

<div style={{
borderTop:"1px solid rgba(255,255,255,0.1)",
marginTop:40,
paddingTop:20,
display:"flex",
justifyContent:"space-between",
flexWrap:"wrap",
gap:10,
fontSize:13
}}>

<div>
© {new Date().getFullYear()} Aurelius Foundation. All rights reserved.
</div>

<div style={{display:"flex",gap:20}}>

<a href="/privacy" style={{color:"#cbd5f5",textDecoration:"none"}}>
Privacy Policy </a>

<a href="/terms" style={{color:"#cbd5f5",textDecoration:"none"}}>
Terms & Conditions </a>

</div>

</div>

</div>

</footer>

)

}
