import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import './newinfo.css'
import '../images/shoe.jpg'
import '../images/janssSteps.jpg'

export default function NewInfo() {

    const {currentUser, setInfo} = useAuth()

    let navigate = useNavigate();

    async function handleSubmit(e) {

        // var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        

        const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        

        
        
        e.preventDefault()
        //Check that inches < 12, input types are correct
        setError("")
        setLoading(true)

        if (name === ""){
            setError("Need a name")
            setLoading(false)
            return
        }
        if (sex == '')
        {
            setError("Please select a sex")
            setLoading(false)
            return
        }
        if (inches > 11 || inches < 0){
            setError("Inches must be between 0 and 11")
            setLoading(false)
            return
        }

        //inclusive! lightest and heaviest recorded humans' weights
        if (weight < 9 || weight > 1400)
        {
            setError("Please enter a valid human weight")
            setLoading(false)
            return
        }
        if (age < 0 || age > 123)
        {
            setError("Please enter a valid age")
            setLoading(false)
            return
        }
        if (feet < 0 || feet > 10)
        {
            setError("Please enter a valid number of feet")
            setLoading(false)
            return
        }

        try{
            //set info usage: setInfo(userUID, Email, Name, Weight, Height_ft, Height_in, Age, myTimestamp, sex, bmr)
            console.log(myTimestamp)
            await setInfo(currentUser.uid, currentUser.email, name, weight,feet, inches, age, myTimestamp, sex, bmr)
            setLoading(false)
            console.log("Success")
        }catch(err){
            setError(err.message)
        }
        

    //get height in cm
    let height = ((12 * feet + inches) * 2.54)
     if (sex =='m')
    {
        let value = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        setBmr(e.target.value)
    }
    else{
        setBmr(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age))
    }
    console.log(bmr)
        setLoading(false)

        //go to home page
        return navigate('/')
    }

    //backend state
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [name, setName] = useState('');
    const [weight, setWeight] = useState(0);
    const [feet, setFeet] = useState(0);
    const [inches, setInches] = useState(0);
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('');
    const [bmr, setBmr] = useState(0)
    

    return (
     <div id='body' className = "style">
            <h1> New User Information</h1>

            <div> Enter your name 
                <div id='inputFieldContainer'>
                  <input 
                    className='inputBox' 
                    placeholder='   Name'
                    type="text"
                    value={name}
                    onChange={(e) =>{
                        setName(e.target.value)
                        }
                    }
                  />
             </div>
          </div>
        <div>
            Enter your sex
            <div id = "select">
                <select onClick={(e) => {setSex(e.target.value)}}>
                    Workout Preference
                    <option value=''>Select</option>
                    <option value = "f">F</option>
                    <option value = 'm'>M</option>
                </select>
            </div>
        <div>
            Enter your age
            <div id='inputFieldContainer'>
                  <input 
                    className='inputBox' 
                    placeholder='   Age'
                    type="number"
                    value={age}
                    onChange={(e) =>{
                        setAge(e.target.value)
                        
                        }
                    }
                  />
            </div>
        </div>
       <div>
                Enter your weight (lbs)
                <div id = "inputFieldContainer">
                <input
                    className='inputBox'
                    placeholder='   Weight'
                    type='number'
                    value={weight}
                    onChange={(e) =>
                        setWeight(e.target.value)
                    }
                    />
                </div>
                    </div>
        <div>
            Enter your height
            <div id='dualField'>
                  <input
                    className='inputBox' 
                    placeholder='   Feet'
                    type="number"
                    min="0"
                    max="10"
                    value={feet}
                    onChange={(e) =>{
                        setFeet(e.target.value)
                        }
                    }
                  />

                <input 
                    className='inputBox' 
                    placeholder='   Inches'
                    type="number"
                    min="0"
                    max="11"
                    value={inches}
                    onChange={(e) =>{
                        setInches(e.target.value)
                                            }
                    }
                  />   
            </div>
            </div>
            {loading? <h1>Submitting info, please wait!</h1>:
                <div>
                <button className='shoe' onClick={handleSubmit} 
                align='mid'>
                    <div id='submit'>
                       <b> Submit info </b>
                    </div>
                <div> &#8594;</div>
                </button>
            </div>
            }   
            {error?
            <h1>{error}</h1>:
            <></>}
        </div>
    </div>
    )
}
