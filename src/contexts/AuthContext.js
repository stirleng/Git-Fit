import React, { useContext, useState, useEffect} from 'react'
import { db, auth } from '../firebase';
import firebase from 'firebase/compat/app'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState();
  const [test, setTest] = useState(0)
  // const [loading, setLoading] = useState(true);

  function signUp(email,password){
    setTest(2)
    return auth.createUserWithEmailAndPassword(email,password)
  }
  
  function signIn(email, password){
    return auth.signInWithEmailAndPassword(email,password)
  }


  function setInfo(userUID, Email, Name, Weight, Height_ft, Height_in, Age, myTimestamp){
    return db.collection("users").doc(userUID).set({
      Name: Name,
      Email: Email,
      Weight: parseFloat(Weight),
      Height_ft: parseFloat(Height_ft),
      Height_in: parseFloat(Height_in),
      Age: parseFloat(Age),
      Start_Date: myTimestamp,
      Leg_Days: 0,
      Chest_Days: 0,
      Arms_Days: 0
    })
  }

  function getUser(userUID){
    return db.collection("users").doc(userUID).get()
  }
  

  function setMeal(dishName, isVegetarian, isWhiteMeat, recipeLink, proteinSource, gramOfProtein, calories){
    const newDishName = dishName.replaceAll(' ','_')
    return db.collection("meals").doc(newDishName).set({
      DishName: dishName,
      isVegetarian: isVegetarian,
      isWhiteMeat: isWhiteMeat,
      link: recipeLink,
      Protein: proteinSource,
      Protein_Grams: parseFloat(gramOfProtein),
      Calories: parseFloat(calories),
    })
  }

  function updateData(path){
    return db.collection("data").doc(path).update({
      count: firebase.firestore.FieldValue.increment(1)
    })
  }

  function setWorkout(category, caloriesBurned, intensity, name, workoutLink, description, location){
    const newName = name.replaceAll(' ', '_')
    return db.collection("workout").doc(newName).set({
      Name: name,
      Category: category,
      Calories_Burned: parseFloat(caloriesBurned),
      Intensity: intensity,
      Link: workoutLink,
      Description: description,
      //TODO: Use geohash to store + search nearby locations in firebase
      Location: location
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
      getUser,
      setMeal,
      setWorkout,
      test,
      

  }

  return (
    <AuthContext.Provider value = {value}>
       {children}
    </AuthContext.Provider>

  )
}
