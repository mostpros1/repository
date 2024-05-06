import React from 'react'
import { Link } from 'react-router-dom'
import "./chatbox.css"

function ChatBtn({ action, label }) {
  return <button onClick={action}>{label}</button>;
}

export { ChatBtn };