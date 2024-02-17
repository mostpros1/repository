import React from 'react'
import { Link } from 'react-router-dom'
import "./chatbox.css"

function Chatbtn() {
  return (
    <Link to="/chat" className='buttonc'>Chatbtn</Link>
  )
}

export default Chatbtn