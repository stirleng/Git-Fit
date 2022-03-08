import React,  {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { db, collection, getDocs, query, where, limit, useFirestoreDocument, QuerySnapshot} from '../../firebase';
import './Stats.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function Stats() {
    const {currentUser} = useAuth()
    let age = currentUser.age
    let sex = currentUser.sex
    let weight = 0.453592 * currentUser.weight
    let height = 2.54 * (12 * currentUser.feet + currentUser.inches)

    let bmr = 0
    if (sex =='m')
    {
        bmr =  88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        console.log(bmr)
    }

    else{
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    return(
        <div>
        <h1>
            yoyoyoy {currentUser.age}
        </h1>
        </div>
    )
}