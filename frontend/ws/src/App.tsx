import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket> (null)
  const [latestMessage,SetLatestMessage]=useState('')
  const [input,setInput]=useState('')
  useEffect(()=>{
    const socket =new WebSocket('ws://localhost:8080')
     socket.onopen=()=>{
      console.log('conneted')
     }
     setSocket(socket)
     socket.onmessage=(message)=>{
      console.log("Received Message "+ message.data)
     SetLatestMessage(message.data)

     }
     
   },[])
   if(!socket){
    return <div>
      server is connecting ...
    </div>
   }
  return (
   
      <div>
        <div>
          <input type='text' onChange={(e)=>{setInput(e.target.value)}}></input>
          <button onClick={()=>{
            socket.send(input)
          }}>send</button>
        </div>
       {latestMessage}
      </div>
    
  )
}

export default App
