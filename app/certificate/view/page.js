"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabase"

export default function CertificateView(){

const params = useSearchParams()
const id = params.get("id")

const [data,setData] = useState(null)

useEffect(()=>{

async function load(){

const {data} = await supabase
.from("anse_mock_results")
.select("*")
.eq("id",id)
.single()

setData(data)

}

if(id) load()

},[id])

if(!data) return <p style={{padding:40}}>Loading...</p>

return(

<div style={{
display:"flex",
justifyContent:"center",
padding:40
}}>

<div style={{
width:800,
border:"10px solid #1e3a8a",
padding:40,
textAlign:"center"
}}>

<h2>Aurelius Foundation</h2>

<h1 style={{marginTop:20}}>
Certificate of Achievement
</h1>

<p style={{marginTop:30}}>
This is to certify that
</p>

<h2 style={{marginTop:10}}>
{data.student_name}
</h2>

<p style={{marginTop:20}}>
participated in the
</p>

<h3>Aurelius National Scholarship Examination</h3>

<p style={{marginTop:20}}>
Free Grand Test – {data.exam_year}
</p>

<h2 style={{marginTop:20}}>
National Rank: {data.rank}
</h2>

<p style={{marginTop:40}}>
Aurelius Foundation
</p>

</div>

</div>

)

}
