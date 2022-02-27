import React from 'react'
import { Navigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

//To make sure that user has to login or signup first before 
//accessing homepage
export default function PrivateRoute({children}) {

   const {currentUser} = useAuth();


  return currentUser ? children : <Navigate to="/signup" />;
  
}
