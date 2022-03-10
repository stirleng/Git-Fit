import React,  {useState, useEffect} from 'react'
import firebase from 'firebase/compat/app';
import { useAuth } from '../../contexts/AuthContext'
import { db, collection, getDocs, query, where, limit, useFirestoreDocument, QuerySnapshot} from '../../firebase';
import './stats.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import { doc, getDoc, DocumentSnapshot, FieldPath, documentId, forEach } from "firebase/firestore";
import {set, ref} from 'firebase/database'

export default function Stats() {

    const [userData, setUserData] = useState([])
    const [cal, setCal] = useState(0)
    const [proj, setProj] = useState(0)
    const [protein, setProtein] = useState(0)
    const {currentUser} = useAuth()
    const [name, setName] = useState('')
    const [userSeconds, setUserSeconds] = useState(0)
    const [activeDays, setActiveDays] = useState(0)
    const [feet, setFeet] = useState(0)
    const [inches, setInches] = useState(0)
    const [weight, setWeight] = useState(0)
    const [sex, setSex] = useState('')
    const [age, setAge] = useState(0)
    const [toChange, setToChange] = useState('')
    const [newVal, setNewVal] = useState(0)
    const [error, setError] = useState("")

    async function getUserSeconds(){
        await db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
            if (snapshot){
              setUserSeconds(snapshot.data().Start_Date.seconds)
            }
        })
    }
    const currentDate = new Date().getTime() / 1000;
    const diffSecond = currentDate - userSeconds;
    const daySinceStart = Math.floor(diffSecond / (3600*24)) + 1
    
    useEffect(()=>{
        getUserSeconds()
      }, [])

   // await db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
        //access data
    //})
    let uid = currentUser.uid

    //access user info in the backend
        async function onRender(){
            await db.collection("users").doc(uid).get().then((snapshot) =>{
                    setAge(snapshot.doc().Age)
                    setFeet(snapshot.doc().Height_ft)
                    setInches(snapshot.doc().Height_in)
                    setWeight(snapshot.doc().Weight)
                    setSex(snapshot.doc().Sex)
                    let name = snapshot.doc().Name
                    setActiveDays(snapshot.doc().Chest_Days + snapshot.doc().Arms_Days + snapshot.doc().Leg_Days)


                    let weight_kg = 0.453592 * weight
                    let height_cm = 2.54 * (12 * feet + inches)
        
                    let bmr = 0
                    if (sex =='m')
                    {
                        bmr =  1.55 * (88.362 + (13.397 * weight_kg) + (4.799 * height_cm) - (5.677 * age))
                    }
        
                    else{
                        bmr = 1.55 * (447.593 + (9.247 * weight_kg) + (3.098 * height_cm) - (4.330 * age))
                    }
                    setCal(bmr.toFixed(2) - 500)
                    setProj(weight - 5)
                    setProtein(snapshot.get("Proteins_Consumed"))
                    setName(name)
              })
        }
    
        async function changeInfo(tag, val){
            if (val === ''){
                setError("please choose which stat you want to update")
                return
            }


                
            await db.collection("users").doc(currentUser.uid).update({
                [tag] : parseFloat(val),
            })
        }

        //runs whenever page loads
         useEffect(()=>{
             onRender()
          }, [])

          
          let cr = (daySinceStart == 0) ? activeDays : activeDays / daySinceStart
    return(
        <div id='header'>
            <h1>
                {name}'s Fitness Numbers 
            </h1>
            {cal && proj && name ? <body>
                If you eat about <b>{cal}</b> calories a day and follow your plan, you will weigh less
                than <b>{proj}</b> lbs in just 5 weeks! <br></br>Keep it up
                <br></br><br></br>
                
                It's been <b>{daySinceStart}</b> days since you joined, and you've completed <b>{activeDays}</b> workouts. 
                <br></br><br></br>
                Average Workouts Per Day: {cr}
                <br></br><br></br>
                Over the course of your time here, you've
                consumed {protein.toFixed(2)} grams of proteins! Eating a high-protein <br></br>
                 diet is the best way to build muscle while burning fat!
                 <br></br><br></br>

                Your Physique Info:
                <div id='info'>
                    {age}{sex}: {feet}'{inches}" and {weight} lbs
                </div>

            </body>: <body>
                Loading
            </body>}
            <div id='dualField'>
            <div id = "select">
                <select onClick={(e) => {setToChange(e.target.value)}}>
                    Workout Preference
                    <option value=''>Need to update some info?</option>
                    <option value = "Age">Age</option>
                    <option value="Height_ft">Height (feet)</option>
                    <option value="Height_in">Height (inches)</option>
                    <option value="Weight">Weight</option>
                </select>

             <div>
                <input 
                    className='inputBox' 
                    placeholder=' New Value'
                    type="number"
                    value={newVal}
                    onChange={(e) =>{
                        setNewVal(e.target.value)
                       }
                    }
                  />   
                  </div>

                <button type ="button" onClick={(e) => {changeInfo(toChange, newVal)}}>
                    Update Info    
                </button>
            </div>
        </div>
        </div>
    )
}