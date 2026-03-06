export default function AboutPage(){

return(

<div style={{background:"#f8fafc",padding:"60px 20px"}}>

<div style={{maxWidth:1000,margin:"0 auto"}}>

{/* HERO */}

<h1 style={{
fontSize:42,
marginBottom:20,
textAlign:"center"
}}>
About Aurelius Foundation
</h1>

<p style={{
fontSize:18,
lineHeight:1.7,
textAlign:"center",
maxWidth:800,
margin:"0 auto 60px auto",
opacity:0.9
}}>
Aurelius Foundation is an academic initiative dedicated to discovering
and supporting talented students preparing for India's most competitive
entrance examinations such as JEE and NEET.
Through national-level assessments and scholarship programs,
the foundation aims to encourage academic excellence and reward
high-performing students across the country.
</p>
{/* SUPPORTING DIGNITARIES */}

<div style={{marginBottom:70}}>

<h2 style={{
fontSize:38,
marginBottom:20,
textAlign:"center"
}}>
Supporting Dignitaries
</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:25
}}>

{[1,2,3,4,5,6,7,8].map((item)=>(
<div
key={item}
style={{
background:"white",
borderRadius:10,
padding:20,
textAlign:"center",
boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
}}
>

<div style={{
width:"100%",
height:160,
background:"#e5e7eb",
borderRadius:8,
marginBottom:15
}}>
{/* Image placeholder */}
</div>

<h3 style={{marginBottom:8}}>
Name
</h3>

<p style={{
fontSize:14,
opacity:0.8
}}>
Short description about the dignitary.
</p>

</div>
))}

</div>
{/* HIGHLIGHT CARDS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:25,
marginBottom:70
}}>

<div style={{
background:"white",
padding:30,
borderRadius:10,
textAlign:"center",
boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
}}>

<h2 style={{color:"#1e3a8a"}}>₹1 Crore</h2>

<p>
National scholarship prize pool designed to reward
academic excellence among students across India.
</p>

</div>

<div style={{
background:"white",
padding:30,
borderRadius:10,
textAlign:"center",
boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
}}>

<h2 style={{color:"#1e3a8a"}}>Nationwide</h2>

<p>
Students from across India participate in the examination
through a secure online platform.
</p>

</div>

<div style={{
background:"white",
padding:30,
borderRadius:10,
textAlign:"center",
boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
}}>

<h2 style={{color:"#1e3a8a"}}>AI Proctored</h2>

<p>
Advanced proctoring technology ensures fairness and
integrity during the examination.
</p>

</div>

</div>

{/* MISSION */}

<div style={{marginBottom:70}}>

<h2 style={{marginBottom:15}}>
Our Mission
</h2>

<p style={{lineHeight:1.8}}>
India has millions of students preparing for highly competitive
entrance examinations such as JEE and NEET. However, many students
lack access to national-level testing environments that accurately
reflect the competition they will face.

The Aurelius Foundation was created to bridge this gap by providing
a transparent and merit-based scholarship examination platform where
students can test their abilities against peers across the country.

</p>

</div>

{/* ABOUT ANSE */}

<div style={{marginBottom:70}}>

<h2 style={{marginBottom:15}}>
Aurelius National Scholarship Examination (ANSE)
</h2>

<p style={{lineHeight:1.8}}>
The Aurelius National Scholarship Examination (ANSE) is a
nationwide academic competition designed for students preparing
for engineering and medical entrance examinations.

The exam evaluates conceptual understanding, analytical thinking,
and problem-solving abilities through carefully designed questions.

Students receive national rankings based on performance, and top
performers are awarded scholarships and academic recognition.

</p>

<ul style={{marginTop:20,lineHeight:1.8}}>
<li>Nationwide online examination</li>
<li>AI-assisted proctoring system</li>
<li>National leaderboard rankings</li>
<li>Scholarships and academic awards</li>
<li>Performance analytics for students</li>
</ul>

</div>

{/* TRUST SECTION */}

<div style={{marginBottom:70}}>

<h2 style={{marginBottom:15}}>
Why Students Trust ANSE
</h2>

<p style={{lineHeight:1.8}}>
Aurelius Foundation is committed to maintaining transparency,
fairness, and academic integrity.

Every examination attempt is monitored through proctoring
technology and may undergo manual review to ensure a fair
environment for all participants.

Results and rankings are determined strictly based on
performance, making ANSE a credible academic competition
for aspiring engineers and doctors.

</p>

</div>

{/* FUTURE VISION */}

<div style={{marginBottom:70}}>

<h2 style={{marginBottom:15}}>
Looking Ahead
</h2>

<p style={{lineHeight:1.8}}>
The foundation plans to expand its initiatives by introducing
more academic competitions, scholarship opportunities, and
learning resources that support students throughout their
competitive exam preparation journey.

Our long-term goal is to establish ANSE as one of the most
recognized scholarship examinations for aspiring engineers
and doctors in India.

</p>

</div>



</div>

{/* CTA */}

<div style={{
textAlign:"center",
marginTop:50
}}>

<h2 style={{marginBottom:20}}>
Participate in ANSE 2027
</h2>

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

Register for ANSE

</a>

</div>

</div>

</div>

)

}