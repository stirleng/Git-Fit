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
  const [userArmsDayCount, setUserArmsDayCount] = useState(0)
  const [userChestDayCount, setUserChestDayCount] = useState(0)
  const [userLegDayCount, setUserLegDayCount] = useState(0)

  //both of these can just get replaced by meals.name or workout.name
  const [suggestionMeal, setSuggestionMeal] = useState("") //meal name
  const [workoutSuggestion, setWorkoutSuggestion] = useState("") //workout name, 

  
  //const [workoutType, setWorkoutType] = useState("")


  const [meals, setMeals] = useState([]) //single meal object
  const [mealArray, setMealArray] = useState([]) //array of meals object
  const [highProteinMealArray, setHighProteinMealArray] = useState([])
  const [medProteinMealArray, setmedProteinMealArray] = useState([])
  const [lowProteinMealArray, setlowProteinMealArray] = useState([])
  

  const [workout, setWorkout] = useState(null) //single workout object
  const [workoutArray, setWorkoutArray] = useState([]) //array of workout object
  const [chestArray, setChestArray] = useState([]);
  const [legArray, setLegArray] = useState([]);
  const [armArray, setArmArray] = useState([]);

  async function fetchUserMealsandWorkout(){

    var localADC = 0
    var localCDC = 0
    var localLDC = 0

    var localIntensity = ""

    await db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
      if (snapshot){
        setUser(snapshot.data())
        localADC = snapshot.data().Arms_Days
        localCDC = snapshot.data().Chest_Days
        localLDC = snapshot.data().Leg_Days
        setUserSeconds(snapshot.data().Start_Date.seconds)
        setUserArmsDayCount(snapshot.data().Arms_Days)
        setUserChestDayCount(snapshot.data().Chest_Days)
        setUserLegDayCount(snapshot.data().Leg_Days)
      }
    })
    //await db.collection("workout")

    await db.collection("workout").get().then((snapshot) =>{
      if (snapshot){
        const tempWork = [];
        snapshot.forEach(documentSnapshot =>{
          tempWork.push(documentSnapshot.data())      
        })
        //saving the original copy of all the workout
        setWorkoutArray(tempWork)


        //randomly selecting based on the current lowest day
        let workoutLowestStringArray = []
        let workoutLowestNum = Math.min(localADC, Math.min(localCDC, localLDC))
        switch (workoutLowestNum){
          case localADC:
            workoutLowestStringArray.push("bicep")
            workoutLowestStringArray.push("tricep")
            workoutLowestStringArray.push("shoulder")
            workoutLowestStringArray.push("arm")
            break;
          case localCDC:
            workoutLowestStringArray.push("back")
            workoutLowestStringArray.push("abs")
            workoutLowestStringArray.push("chest")
            break;
          default:
            workoutLowestStringArray.push("leg")
            workoutLowestStringArray.push("cardio")
        }

        let finalWorkoutString = workoutLowestStringArray[Math.floor(Math.random() * workoutLowestStringArray.length)]

        let filterArray = [];
        let tempChestArray = [];
        let tempArmArray = [];
        let tempLegArray = [];
        for (let i = 0; i < tempWork.length; i++){
            let curCategory = tempWork[i].Category
            if (curCategory === finalWorkoutString){
              filterArray.push(tempWork[i])
            }
            switch(curCategory){
                case "bicep":
                case "tricep":
                case "shoulder":
                case "arm":
                  tempArmArray.push(tempWork[i])
                  break
                case "back":
                case "abs":
                case "chest":
                  tempChestArray.push(tempWork[i])
                  break
                case "cardio":
                case "leg":
                tempLegArray.push(tempWork[i])
             }
          }
        const randInt = Math.floor(Math.random()*(filterArray.length))
        localIntensity = filterArray[randInt].Intensity;
        setWorkoutSuggestion(filterArray[randInt].Name);
        setWorkout(filterArray[randInt])
        
        setChestArray(tempChestArray);
        setArmArray(tempArmArray);
        setLegArray(tempLegArray)
      }
    })

    //fetch all meals
    await db.collection("meals").get().then((snapshot) =>{
      if(snapshot){
        const tempMeals =[]
        snapshot.forEach(documentSnapshot =>{
          tempMeals.push(documentSnapshot.data())      
        })
        // console.log(tempMeals)
        setMealArray(tempMeals)
        let tempLowP = [];
        let tempMedP = [];
        let tempHighP = [];
        for (let i = 0; i < 40; i++){
          let curProtein = tempMeals[i].Protein_Grams
          if (curProtein < 3){
            tempLowP.push(tempMeals[i])
          }else if (curProtein < 9){
            tempMedP.push(tempMeals[i])
          }else{
            tempHighP.push(tempMeals[i])
          }
        }

        
        let tempFilterP = localIntensity === "high" ? tempHighP: localIntensity === "medium"? tempMedP: tempLowP
        const randInt = Math.floor( Math.random()*tempFilterP.length)
        setSuggestionMeal(tempFilterP[randInt].DishName)
        setMeals(tempFilterP[randInt])

        setHighProteinMealArray(tempHighP);
        setmedProteinMealArray(tempMedP);
        setlowProteinMealArray(tempLowP);
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

  

    var workoutType = workout.Category

    
    var localADC = userArmsDayCount
    var localCDC = userChestDayCount
    var localLDC = userLegDayCount
    


    switch (workoutType)
    {
      case "bicep":
      case "tricep":
      case "shoulder":
      case "arm":
        localADC += 1;
        await db.collection("users").doc(currentUser.uid).update({
          Arms_Days: firebase.firestore.FieldValue.increment(1)
        })
        setUserArmsDayCount(userArmsDayCount +1)
        break
      case "back":
      case "abs":
      case "chest":
        localCDC += 1
        await db.collection("users").doc(currentUser.uid).update({
          Chest_Days: firebase.firestore.FieldValue.increment(1)
        })
        setUserChestDayCount(userChestDayCount + 1)
        break
      case "cardio":
      case "leg":
        localLDC +=1
        await db.collection("users").doc(currentUser.uid).update({
          Leg_Days: firebase.firestore.FieldValue.increment(1)
        })
        setUserLegDayCount(userLegDayCount+1)
        break
    }

    //getting new workout based on lowest
    let workoutLowestNum = Math.min(localADC, Math.min(localCDC, localLDC))
    let lowestArray = []
    switch(workoutLowestNum){
      case localADC:
        lowestArray = armArray
        break;
      case localCDC:
        lowestArray = chestArray
        break;
      default:
        lowestArray = legArray
    }
    const randIntWorkout = Math.floor(Math.random()*(lowestArray.length))
    setWorkoutSuggestion(workoutArray[randIntWorkout].Name);
    setWorkout(lowestArray[randIntWorkout])

    let localIntensity = lowestArray[randIntWorkout].Intensity

    //getting new meal
    
    let tempMealFilter = localIntensity === "high" ? highProteinMealArray: localIntensity === "medium"? medProteinMealArray: lowProteinMealArray
    const randIntMeal = Math.floor( Math.random()*tempMealFilter.length)
    // console.log(tempMealFilter.length)
    // console.log("---------")
    // console.log(randIntMeal)
    // console.log("********************")
    setSuggestionMeal(tempMealFilter[randIntMeal].DishName)
    setMeals(tempMealFilter[randIntMeal])

    

    //fetchUser()
  }

  useEffect(()=>{
    // setWorkoutSuggestion("Squat")   //TODO: remove here and replace with a function that produces a random workout
    fetchUserMealsandWorkout();
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
          {workout === null ? 
            <div id='WorkoutSuggestion'>
              <h1>Null</h1> 
            </div>:
            <div id="WorkoutSuggestion">
              {workout.Name}
            </div>
          }
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