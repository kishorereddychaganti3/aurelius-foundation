"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function RegistrationCounter() {

const [count,setCount] = useState(0)
const [display,setDisplay] = useState(0)

useEffect(()=>{
fetchCount()
},[])

useEffect(()=>{
let start = 0
const duration = 1200

const step = () => {
  start += Math.ceil(count/20)

  if(start >= count){
    setDisplay(count)
    return
  }

  setDisplay(start)
  requestAnimationFrame(step)
}

step()


},[count])

const fetchCount = async () => {


const { data } = await supabase
  .from("anse_registrations")
  .select("registration_number")

const unique = new Set(
  data.map(r=>r.registration_number)
)

setCount(unique.size)


}

return(


<div>

  <h2>Students Registered</h2>

  <div style={{
    fontSize:48,
    fontWeight:"bold",
    color:"#1e3a8a",
    marginTop:10
  }}>
    {display.toLocaleString()}
  </div>

  <p>for ANSE 2027</p>

</div>


)

}
