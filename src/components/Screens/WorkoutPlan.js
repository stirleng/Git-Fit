import '../styles/WorkoutPlan.css'
import React, {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {db} from '../../contexts/firebase'

export default function WorkoutPlan (){


    const [pref, setPref] = useState('chest');
    const [workoutArray, setWorkoutArray] = useState([]);
    const [displayArray, setDisplayArray] = useState([]);
    const [, setDisplayArrayLength] = useState(-1);

    //to shuffle array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
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
              const tempWork =[];
              const allWork = [];
              snapshot.forEach(documentSnapshot =>{
                allWork.push(documentSnapshot.data());
                if (documentSnapshot.data().Category === pref){
                  tempWork.push(documentSnapshot.data()) 
                }       
              });
              

              
              setWorkoutArray(allWork);

              //choosing 6 random workout

              shuffle(tempWork);
              setDisplayArray(tempWork);
              setDisplayArrayLength(tempWork.length)
             
            }
          })
    }

    useEffect(()=>{
        onRender();
    }, []);


    async function handleClick(){
     
        
        const prefArray = [];
        for (let i = 0; i < workoutArray.length; i++){
          if (workoutArray[i].Category === pref){
            prefArray.push(workoutArray[i]);
          }
        }
        shuffle(prefArray);
        setDisplayArray(prefArray);
        setDisplayArrayLength(prefArray.length)
        
    
    }


    return (
        
        <div id='white-background'>
          <div id='workout-plan-screen-header'>
            <h1>Workout Plan</h1>
          </div> 
          <div id = 'workout-plan-filter'>
            <div id = "select">
                <div id='filter-tools'>
                  <select onClick={(e) => {setPref(e.target.value)}}>
                      Workout Preference
                      <option value='chest'>Select a Category</option>
                      <option value = "chest">Chest</option>
                      <option value="back">Back</option>
                      <option value="leg">Legs</option>
                      <option value="bicep">Bicep</option>
                      <option value="shoulder">Shoulders</option>
                      <option value="tricep">Triceps</option>
                  </select>
                  <div class="break"></div>
                  <button id = "submit" type='button'
                    onClick={(e) => {handleClick()}}>
                    Get your workout!   
                </button>
                </div>
                
             <div>
                {displayArray[0] != null && 
                <h1>{displayArray[0].Name}</h1>}
                {displayArray[1] != null && 
                <h1>{displayArray[1].Name}</h1>
                }
                {displayArray[2] != null && 
                <h1>{displayArray[2].Name}</h1>}
                {displayArray[3] != null && 
                <h1>{displayArray[3].Name}</h1>
                }
                {displayArray[4] != null && 
                <h1>{displayArray[4].Name}</h1>}
                {displayArray[5] != null && 
                <h1>{displayArray[5].Name}</h1>
                }
            </div>
         </div>
         </div>
             </div>
    )
}