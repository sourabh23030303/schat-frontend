import React, { useEffect, useState } from 'react'
import { user } from '../join/join'
import socketIO from "socket.io-client"
import "./chat.css"
import Message from '../message/message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import logo from "../chat/logo.png"



let socket;
const Chat = () => {
       // message(1)
    const [id, setid] = useState("")
const  [message, setmessage] = useState([])
    const send=()=>{
        // message(1)
      const message=  document.getElementById('chatinput').value
        socket.emit('message',{message,id})
        document.getElementById('chatinput').value=''
    }
    
    useEffect(() => {
        const ENDPOINT = "https://sonic-chat-server.onrender.com"
      socket = socketIO(ENDPOINT, { transports: ['websocket'] })
        //connect is the name  of event 
        //on means receiving
        socket.on('connect', () => {
            console.log("connected");
            //message(1)
            setid(socket.id)
        })
        //emit means data is sending (sending user to the socket server) (1)
        socket.emit('joined', { user })
        //receiving response from the socket (2)
        socket.on('welcome', (data) => {
            setmessage([...message,data])
            console.log(data.user, data.message)
        })
      

  //(3)broadcast receiving user with its message
  socket.on('usejoined', (data) => {
    setmessage([...message,data])
    console.log(data.user, data.message)
})
// (4) on leave
socket.on('leave',(data)=>{
    setmessage([...message,data])
    console.log(data.user,data.message)
})

        return () => {
            //(4)
            socket.emit('disconnect')
            socket.off()
        }
    }, [])

//for messsage (1)
    useEffect(() => {
      socket.on('sendmessage',(data)=>{
        setmessage([...message,data])
        console.log(data.user,data.message,data.id)
      })
    
      return () => {
       socket.off()
      }
    }, [message])
    



    return (
        <div className='chatpage'>
            <div className='chatcontent' >

                <div className='header'>
          
                <img  src={logo} alt="logo" /> 
                <div>
                <a href="/">
                <i className="gg-close-o"></i>
                </a>
                </div>
                </div>

                <ReactScrollToBottom className='chatbox'>
                    {message.map((item,i)=>  <Message message={item.message} user={item.id===id?"":item.user} classs={item.id===id? "right":"left"}  />
                       
                    )}
                    </ReactScrollToBottom>
               

                <div className='inputbox'>
                    <input onKeyPress={(event)=>event.key==='Enter'?send():null} type="text" id='chatinput' />
                    <button onClick={send} className='sendbtn'>

                        <i className=' fa fa-send'></i>
                    </button>


                </div>

            </div>
        </div>
    )
}

export default Chat