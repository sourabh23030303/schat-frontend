import React, { useState } from 'react'
import { Link } from "react-router-dom";
import '../join.css';
import logo from "./image/logo.png"



let user;
//sending user name to chat page also making its value blank for other user
const senduser=()=>{
  user= document.getElementById('joininput').value
   document.getElementById('joininput').value=""
 }
const Join = () => {
  //using usesate if user dont enter the name 
  const [name, setname] = useState("")


  return (
 <div className='joinpage'>
<div className='joincontainer'>
    <div className='logo'>
   <img  src={logo} alt="logo" />
    </div>
    <h1>welcome to Sonic chat</h1>
    <input onChange={(e)=>{setname(e.target.value)}} placeholder='Enter your name' type="text" id='joininput' /> <br />
    <Link onClick={(event)=>!name ? event.preventDefault():null} to="/Chat"> 
<button onClick={senduser} className='joinbtn  glow-button '>login</button>
    </Link>
</div>
 </div>
  )
}

export default Join
export {user}