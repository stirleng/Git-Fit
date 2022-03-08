import './WorkoutPlan.css'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import {db} from '../../firebase'
import {  collection, getDocs, query, where, limit } from 'firebase/firestore'

export default function WorkoutPlan (){

    const {setPlan} = useAuth()
    const [pref, setPref] = useState('')
    async function handleClick(e){

    const workouts = collection(db, "workout")

    e.preventDefault()

        if (pref == ''){
            alert("Please select a category")
            return
        }

    const plan =  query(workouts, where("Category", "==", pref), limit(6));
    const getPlan = await getDocs(plan)

    getPlan.forEach((doc) => {console.log(doc.data())})
    

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
            </div>
         </div>
             </div>
    )
}