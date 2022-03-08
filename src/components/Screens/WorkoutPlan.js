import './WorkoutPlan.css'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import {db} from '../../firebase'
import {  collection, getDocs, query, where, limit } from 'firebase/firestore'

export default function WorkoutPlan (){

    const {setPlan} = useAuth()
    const [pref, setPref] = useState('')
    const [workoutArray, setWorkoutArray] = useState([]);
    const [displayArray, setDisplayArray] = useState([]);

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
              snapshot.forEach(documentSnapshot =>{
                tempWork.push(documentSnapshot.data())      
              })
              
              setWorkoutArray(tempWork)

              //choosing 6 random workout
              const arrSize = tempWork.length - 7;
              const randInt = Math.floor(Math.random()*arrSize);
              const arraySix = [];
              for (let i = randInt; i < randInt + 6; i++){
                arraySix.push(tempWork[i]);
              }

              shuffle(arraySix);
              setDisplayArray(arraySix)
             
            }
          })
    }

    useEffect(()=>{
        onRender();

        //console.log(workoutArray)
    }, [])


    async function handleClick(e){

        // const workouts = collection(db, "workout")

        // e.preventDefault()
//
        // if (pref == ''){
        //         alert("Please select a category")
        //         return
        // }

        // const plan =  query(workouts, where("Category", "==", pref), limit(6));
        // const getPlan = await getDocs(plan)

        // getPlan.forEach((doc) => {console.log(doc.data())})
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
                {displayArray.length === 6 && 
                <h1>{displayArray[0].Name}</h1>
                }
              
            </div>
         </div>
             </div>
    )
}