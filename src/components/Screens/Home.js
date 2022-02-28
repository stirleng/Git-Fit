import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Home.css'

export default function Home() {

  const {currentUser} = useAuth();
  console.log(currentUser);
  return (
    <div className='HomeScreenHeader'>Home Page</div>
  )
}
