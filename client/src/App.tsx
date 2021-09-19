import React, { useEffect } from 'react'
import {io} from 'socket.io-client';

const socket = io("http://localhost:5000");

function App() {

  useEffect(()=>{
    socket.on("connection", (data)=>{
      console.log(data);
    })
  })
  return (
    <div>
      App
    </div>
  )
}

export default App
