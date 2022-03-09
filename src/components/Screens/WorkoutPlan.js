import './WorkoutPlan.css'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import {db} from '../../firebase'
import {  collection, getDocs, query, where, limit, doc } from 'firebase/firestore'

export default function WorkoutPlan (){

    const {setPlan} = useAuth()
    const [pref, setPref] = useState('chest')
    const [workoutArray, setWorkoutArray] = useState([]);
    const [displayArray, setDisplayArray] = useState([]);
    const [displayArrayLength, setDisplayArrayLength] = useState(-1)

    //to shuffle array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    //run onces on loading the page to fetch all the workouts into workoutArray
    //then populate display array through randomly choosing 6 workouts from workoutArray
    async function onRender(){

        await db.collection("workout").get().then((snapshot) =>{
            if(snapshot){
              const tempWork =[]
              const allWork = []
              snapshot.forEach(documentSnapshot =>{
                console.log(documentSnapshot.data().Category)
                allWork.push(documentSnapshot.data())
                if (documentSnapshot.data().Category === pref){
                  console.log(documentSnapshot.data())
                  tempWork.push(documentSnapshot.data()) 
                }       
              })
              
              
              setWorkoutArray(allWork)

              //choosing 6 random workout

              shuffle(tempWork);
              console.log(tempWork)
              setDisplayArray(tempWork)
              setDisplayArrayLength(tempWork.length)
             
            }
          })
    }

    useEffect(()=>{
        onRender();

        //console.log(workoutArray)
    }, [])


    async function handleClick(e){
        console.log(workoutArray)

        console.log(pref)
        
        const prefArray = [];

        for (let i = 0; i < workoutArray.length; i++){
          if (workoutArray[i].Category === pref){
            prefArray.push(workoutArray[i]);
          }
        }

        shuffle(prefArray);
        setDisplayArray(prefArray)
        setDisplayArrayLength(prefArray.length)
        
    
    }


    return (
        <div id = "body">
             <h1> What do you want to workout today?</h1>
            <div id = "select">
                <select onClick={(e) => {setPref(e.target.value)}}>
                    Workout Preference
                    <option value=''>Select a Category</option>
                    <option value = "chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="leg">Legs</option>
                    <option value="bicep">Bicep</option>
                    <option value="shoulder">Shoulders</option>
                    <option value="tricep">Triceps</option>
                </select>
             <div>
                <button id = "submit" type='button'
                    onClick={(e) => {handleClick(e)}}>
                    Get your workout    
                </button>
                {displayArray.length === displayArrayLength && 
                <div>
                    <h1>{displayArray[0].Name}</h1>
                    <h1>{displayArray[1].Name}</h1>
                    <h1>{displayArray[2].Name}</h1>

                </div>
                
                
                }
              
            </div>
         </div>
             </div>
    )
}