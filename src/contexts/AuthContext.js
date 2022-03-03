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

  function firstSignUp(userUID, userEmail){
    return db.collection("users").doc(userUID).set({
      Name: "",
      Weight: 0,
      Height_ft: 0,
      Height_in: 0,
      Age: 0,
      Email: userEmail
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
      firstSignUp,
  }

  return (
    <AuthContext.Provider value = {value}>
       {children}
    </AuthContext.Provider>

  )
}
