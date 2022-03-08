import React,  {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { db, collection, getDocs, query, where, limit, useFirestoreDocument, QuerySnapshot} from '../../firebase';
import './Home.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import '../images/HomePageBackground.jpg'
import '../images/BarbellImage.png'
import '../images/AppleImage.png'
// How to use react-router-dom:
// https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
//import Button from 'react-bootstrap/Button'

import firebase from 'firebase/compat/app'
import { FieldValue } from 'firebase/firestore';

export default function Home(props) {
  let navigate = useNavigate();

 
  // const diffTime = Math.abs(date2 - date1);
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");
  
  const {currentUser} = useAuth();  
  const [user, setUser] = useState({})
  const [userSeconds, setUserSeconds] = useState(0)
  const [suggestionMeal, setSuggestionMeal] = useState("")
  const [userArmsDayCount, setUserArmsDayCount] = useState(0)
  const [userChestDayCount, setUserChestDayCount] = useState(0)
  const [userLegDayCount, setUserLegDayCount] = useState(0)
  const [workoutSuggestion, setWorkoutSuggestion] = useState("Squat") //TODO: default should be empty string
  //const [workoutType, setWorkoutType] = useState("")


  const [meals, setMeals] = useState([])
  async function fetchMealsandWorkout(){

    //await db.collection("workout")

    //fetch 40 random meals
    await db.collection("meals").orderBy("Calories").startAt(0).limit(40).get().then((snapshot) =>{
      if(snapshot){
        const tempMeals =[]
        snapshot.forEach(documentSnapshot =>{
          tempMeals.push(documentSnapshot.data())      
        })
        // console.log(tempMeals)
        const randInt = Math.floor( Math.random()*40)
        setSuggestionMeal(tempMeals[randInt].DishName)
        setMeals(tempMeals)
      }
    })
  }
 
  async function fetchUser(){
    await db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
      if (snapshot){
        setUser(snapshot.data())
        setUserSeconds(snapshot.data().Start_Date.seconds)
        setUserArmsDayCount(snapshot.data().Arms_Days)
        setUserChestDayCount(snapshot.data().Chest_Days)
        setUserLegDayCount(snapshot.data().Leg_Days)
      }
    })
  }

  async function CompletePlan(){
    var workoutType
    await db.collection("workout").doc(workoutSuggestion).get().then((snapshot) =>{
      if(snapshot){
        workoutType = snapshot.data().Category
      }
    })
    switch (workoutType)
    {
      case "bicep":
      case "tricep":
      case "shoulder":
      case "arm":
        await db.collection("users").doc(currentUser.uid).update({
          Arms_Days: userArmsDayCount + 1
        })
        break
      case "back":
      case "abs":
      case "chest":
        await db.collection("users").doc(currentUser.uid).update({
          Chest_Days: userChestDayCount + 1
        })
        break
      case "cardio":
      case "leg":
        console.log("here")
        await db.collection("users").doc(currentUser.uid).update({
          Leg_Days: userLegDayCount + 1
        })
        break
    }
    fetchUser()
  }

  useEffect(()=>{
    setWorkoutSuggestion("Squat")   //TODO: remove here and replace with a function that produces a random workout
    fetchUser();
    fetchMealsandWorkout();
  }, [])





  //console.log(user)
  const currentDate = new Date().getTime() / 1000; //In real time change to new Date() to get current Date
  const diffSecond = currentDate - userSeconds;
  const daySinceStart = Math.floor(diffSecond / (3600*24)) + 1



 


  return (
    <body className='HomePage'>
      <div className='HomeScreenHeader'>
        Git-Fit
      </div>
      <div className='HomePageButtonContainer'>
        <Link to="/workouts">
          <button type="button" className='HomePageButtons WorkoutsPageButton'>
                Your Workouts
                <br></br>
                <img src={require('../images/BarbellImage.png')} className='BarbellImage'/>
                <div className='NavFromHomeArrow'>
                 &#8594;
                </div>
          </button>
        </Link>
        <Link to="/meals">
          <button type="button" className='HomePageButtons MealsPageButton'>
                Your Meals
                <br></br>
                <img src={require('../images/AppleImage.png')} className='AppleImage'/>
                <div className='NavFromHomeArrow'>
                 &#8594;
                </div>
          </button>
        </Link>
      </div>
      <div id='HomePageSuggestionAndCompletionContainer'>
        <div className='HomePageSuggestionContainer'>
          <div className='HomePageSuggestionBoxTitle'>
            Today's Plan:
          </div>
          <div id='WorkoutSuggestionHeader'>
            Workout for Today:
          </div>
          <div id='WorkoutSuggestion'>
            {workoutSuggestion}
          </div>
          <div>
            Your Next Meal:
          </div>
          <div id='MealSuggestion'>
            {suggestionMeal}
          </div>
        </div>
        <button id='HomePageCompleteSuggestionButton' onClick={() => {CompletePlan()}}>
          Complete Plan
        </button>
      </div>
      <div id="message_container">
        <h1 id="welcome_message">Welcome back, {user.Name}! It has been {daySinceStart} days since you started this journey!</h1>
      </div>
      <div id='WorkoutDayCountContainer'>
        <div className='WorkoutDayCountBox' id='ArmWorkoutDayCountBox'>
          <div className='WorkoutDayCount'>
            {userArmsDayCount}
          </div>
          Arm Days
        </div>
        <div className='WorkoutDayCountBox' id='ChestWorkoutDayCountBox'>
          <div className='WorkoutDayCount'>
            {userChestDayCount}
          </div>
          Chest Days
        </div>
        <div className='WorkoutDayCountBox' id='LegWorkoutDayCountBox'>
          <div className='WorkoutDayCount'>
            {userLegDayCount}
          </div>
          Leg Days
        </div>
      </div>
    </body>
  )
}