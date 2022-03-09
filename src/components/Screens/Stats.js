import React,  {useState, useEffect} from 'react'
import firebase from 'firebase/compat/app';
import { useAuth } from '../../contexts/AuthContext'
import { db, collection, getDocs, query, where, limit, useFirestoreDocument, QuerySnapshot} from '../../firebase';
import './Stats.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import { doc, getDoc, DocumentSnapshot, FieldPath, documentId, forEach } from "firebase/firestore";

 function getUserData(uid) {
        firebase.database().ref('users/' + uid).once("Age", snap => {
            console.log(snap.val())
        })
    }

export default function Stats() {
    const {currentUser} = useAuth()
   // await db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
        //access data
    //})
    let uid = currentUser.uid

    let userData = []
    
await        async function onRender(){
            await db.collection("users").doc(uid).get().then((snapshot) =>{
                        userData.push(snapshot.get("Age"))
                         userData.push(snapshot.get("Height_ft"))
                       userData.push(snapshot.get("Height_in"))
                        userData.push(snapshot.get("Weight"))
                        //userData.push(snapshot.get("Sex"))
                  console.log(userData)
              })
            }
    
            onRender()

          console.log(userData)
    let age = userData[0]//getUserData(uid)
    let sex = 'm'//currentUser.sex
    let weight = 0.453592 * userData[3]
    let height = 2.54 * (12 * userData[1] + userData[2])


    let bmr = 0
    if (sex =='m')
    {
        bmr =  88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    }

    else{
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    let projected = bmr - 500

    return(
        <div>
            <div>
                <button type="button" onClick={(e) => {}}>
                    try
                </button>
            </div>
            If you eat fewer than {age} calories a day, you will be lbs in 5 weeks!
        </div>
    )
}