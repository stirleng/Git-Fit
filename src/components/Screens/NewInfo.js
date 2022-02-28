import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewInfo() {
  
   let navigate = useNavigate();

  function handleSubmit(){
    return navigate('/')
  }

  return (
    <div>
        <div>
            <button onClick={handleSubmit}></button>
        </div>
        NewInfo
    </div>

  )
}
