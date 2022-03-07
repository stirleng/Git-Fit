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
    const plan =  query(collection(db, "workout"), where("Category", "==", {pref}), limit(6));
}


    return (
        <body>
             <h1> What do you want to workout today?</h1>
                <div id='inputFieldContainer'>
                  <input 
                    className='inputBox'
                    placeholder='  Preference'
                    type="text"
                    value={pref}
                    onChange={(e) =>{
                        setPref(e.target.value)
                        }
                    }
                  />
             </div>
        </body>
    )
}