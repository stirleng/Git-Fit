import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './newinfo.css'
import '../images/janssSteps.jpg'

export default function NewInfo() {

    let navigate = useNavigate();

    function handleSubmit() {
        //Check that inches < 12, input types are correct

        //go to home page
        return navigate('/')
    }

    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [age, setAge] = useState('');

    return (
     <div id='body'>
            <h1> New User Info</h1>

            <div> Enter your name 
                <div id='inputFieldContainer'>
                  <input 
                    className='inputBox' 
                    placeholder='   Name'
                    type="text"
                    value={name}
                    onChange={(e) =>{
                        setName(e.target.value)
                        console.log(name)
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
                    type="text"
                    value={age}
                    onChange={(e) =>{
                        setAge(e.target.value)
                        console.log(age)
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
                    type="text"
                    value={feet}
                    onChange={(e) =>{
                        setFeet(e.target.value)
                        }
                    }
                  />

                <input 
                    className='inputBox' 
                    placeholder='   Inches'
                    type="text"
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
                    tpye='text'
                    value={weight}
                    onChange={(e) =>
                        setWeight(e.target.value)
                    }
                    />
                </div>
                    </div>
            </div>
            <div>
                <button onClick={handleSubmit} align='mid'>Submit info</button>
            </div>
        </div>

    )
}
