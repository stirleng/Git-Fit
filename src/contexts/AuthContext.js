import React, { useContext, useState, useEffect} from 'react'
import { db, auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState();
  // const [loading, setLoading] = useState(true);

  function signUp(email,password){
     return auth.createUserWithEmailAndPassword(email,password)
  }
  
  function signIn(email, password){
    return auth.signInWithEmailAndPassword(email,password)
  }


  function setInfo(userUID, Email, Name, Weight, Height_ft, Height_in, Age){
    return db.collection("users").doc(userUID).set({
      Name: Name,
      Email: Email,
      Weight: Weight,
      Height_ft: Height_ft,
      Height_in: Height_in,
      Age: Age
    })
  }



  useEffect(()=> {
   const unsubscribe =  auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        // setLoading(false)
    }, [])
    
    return unsubscribe
  })
  
  const value = {
      currentUser,
      signUp,
      signIn,
      setInfo,
  }

  return (
    <AuthContext.Provider value = {value}>
       {children}
    </AuthContext.Provider>

  )
}
