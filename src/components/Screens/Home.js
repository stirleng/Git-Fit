import React,  {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase';
import './Home.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import '../images/HomePageBackground.jpg'
import '../images/BarbellImage.png'
import '../images/AppleImage.png'
// How to use react-router-dom:
// https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
//import Button from 'react-bootstrap/Button'

import firebase from 'firebase/compat/app'

export default function Home(props) {
  let navigate = useNavigate();

 
  // const diffTime = Math.abs(date2 - date1);
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");
  
  const {currentUser} = useAuth();  
  const [user, setUser] = useState({})

  function fetchUser(){
    db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
      if (snapshot){
        setUser(snapshot.data())
      }
    })
  }
  useEffect(()=>{
    fetchUser();              
  }, [])

  console.log(user)
  const currentDate = new Date(2023, 6, 1).getTime() / 1000; //In real time change to new Date() to get current Date
  const userTimeStamp = user.Start_Date.seconds;
  const diffSecond = currentDate - userTimeStamp;
  const daySinceStart = Math.floor(diffSecond / (3600*24))
  console.log(daySinceStart)

//   const diff = currentDate - userTimeStamp;
//   console.log(diff)
//  console.log(user.Start_Date.seconds)
//  console.log(new Date())
  //const userRef = getDocument(currentUser.uid);
  //console.log(userRef.data)

  // async function receiveUser(){
  //   userRef = await getUser(currentUser.uid)
  // }
  
  // console.log(userRef.data())



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
      <div className='HomePageSuggestionContainer'>
        <div className='HomePageSuggestionBoxTitle'>
          Today's Plan:
        </div>
        <br></br>
        WorkoutPlaceHolder + MealsPlaceHolder
      </div>
      {/* Someone style this message container lol I cant*/}
      <div id="message_container">
        <h1 id="welcome_message">Welcome back, {user.Name}! It has been {daySinceStart} days since you started this journey!</h1>
      </div>
    </body>
  )
}