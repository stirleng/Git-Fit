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

        var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());

        
        
        e.preventDefault()
        //Check that inches < 12, input types are correct
        setError("")
        setLoading(true)

        if (name === ""){
            setError("Need a name")
            setLoading(false)
            return
        }
        if (inches > 11 || inches < 0){
            setError("Inches must be between 0 and 11")
            setLoading(false)
            return
        }

        try{
            //setInfo(userUID, Email, Name, Weight, Height_ft, Height_in, Age, TimeStamp)
            await setInfo(currentUser.uid, currentUser.email, name, weight, feet, inches, age, myTimestamp)
            setLoading(false)
            console.log("Success")
        }catch(err){
            setError(err.message)
        }
        
        

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
                    max="10"
                    value={inches}
                    onChange={(e) =>{
                        setInches(e.target.value)
                                            }
                    }
                  />   
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

    )
}
