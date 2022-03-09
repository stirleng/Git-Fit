import React, {useRef, useEffect, useState}from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './UploadWorkout.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
// Added geofire for recording locations and searching nearby
const geofire = require('geofire-common');

export default function UploadWorkout(props) {
    const {setWorkout} = useAuth();
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  
    //input to db
    const [category, setCategory] = useState("chest");
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [intensity, setIntensity] = useState("low");
    const [name, setName] = useState("");
    const [workoutLink, setWorkoutLink] = useState("")

    //Claire's edits, if it doesn't compile, try deleting these
    const [description, setDescription] = useState("")
    // sets variable description with empty string, updated by SetDescription function
    // useState means it rerenders whenever value is changed
    const [location, setLocation] = useState(null) 
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationHash, setLocationHash] = useState(null)
    //TODO: Make calories, link, intensity, description, fields optional

    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        setLoading(true)

        if(name === ""){
            setError("Need a name for workout")
            setLoading(false)
            return
        }
        if(caloriesBurned <= 0){
            setError("Calories burned can't be 0 or a negative number")
            setLoading(false)
            return
        }
        // Must contain either description or link
        if (workoutLink !== "" || description !== ""){
            if(!(workoutLink.includes("youtube.com") || workoutLink.includes("strava.com"))){
                // TODO: I think we should kill this check, plenty of valid workout/route sources
                setError("invalid link, use youtube or strava")
                setLoading(false)
                return
            }
        }
        else{
            setLoading(false)
            return
        }

        // TODO: CREATE CHECKS ON LAT AND LONG OR DELETE
        if (latitude !== null && longitude !== null){
            //TODO: check bounds
            try{
                setLocationHash(geofire.geohashForLocation([parseInt(latitude), parseInt(longitude)]))
            }
            catch(err){
                setError(err.message)
                setLoading(false)
                return
            }
        }
        try{
            //setWorkout(category, caloriesBurned, intensity, name, workoutLink)
            await setWorkout(category, caloriesBurned, intensity, name, workoutLink, description, latitude, longitude, locationHash)
            setLoading(false)
        }catch(err){
            setError(err.message)
        }

        setLoading(false)
    }

    return (
        <div>
        <div id="title-container">
            <h1>Upload your favorite workout!</h1>
        </div>
        <div id="input-container">

            <div id="single-input">
                <h1 id="input-question">Name of your Workout!</h1>
                <input 
                className='inputBox'
                type="text"
                value={name}
                onChange={(e) =>setName(e.target.value)}
                />
            </div>

           <div id="select-container">
               <label id="category-question" for="selectCategory">Select the category for your workout</label>
               <select name="selectCategoty" id="category-input" value={category} onChange={(e) =>setCategory(e.target.value)}>
                   <option value="chest">Chest</option>
                   <option value="back">Back</option>
                   <option value="bicep">Bicep</option>
                   <option value="shoulder">Shoulder</option>
                   <option value="tricep">Tricep</option>
                   <option value="leg">Leg</option>
                   <option value="cardio">Cardio</option>
                   <option value="abs">Abs</option>
                </select>
           </div>

           <div id="select-container">
               <label id="category-question" for="selectCategory">Intensity Level?</label>
               <select name="selectCategory" id="category-input" value={intensity} onChange={(e) =>setIntensity(e.target.value)}>
                   <option value="low">Low</option>
                   <option value="medium">Medium</option>
                   <option value="high">High</option>
                </select>
           </div>

           <div id="single-input">
                <h1 id="input-question">Calories burned in 1 hour?</h1>
                <input 
                className='inputBox'
                type="number"
                value={caloriesBurned}
                onChange={(e) =>setCaloriesBurned(e.target.value)}
                />
            </div>

            <div id="single-input">
                <h1 id="input-question">Youtube or Strava link of the workout!</h1>
                <input 
                className='inputBox'
                type="text"
                value={workoutLink}
                onChange={(e) =>setWorkoutLink(e.target.value)}
                />
            </div>
            <div id="single-input">
                <h1 id="input-question">Description</h1>
                <textarea
                    maxlength ="10000"
                    rows="5"
                    cols="40"
                    className='inputbox'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                    Default text here
                </textarea>
            </div>
            <div id="single-input">
                <h1 id="input-question">Location</h1>
                <input
                className='inputBox'
                type="text"
                placeholder="TODO: lat, long or address & geocode"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div id="single-input">
                <h1 id="input-question">Latitude</h1>
                <input
                className='inputBox'
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                />
            </div>
            <div id="single-input">
                <h1 id="input-question">Longitude</h1>
                <input
                className='inputBox'
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                />
            </div>
        </div>

        <div id="submit-container">
            {loading? <h1>Uploading your workout, please wait!</h1> : 
            <button id='SubmitButton' onClick={handleSubmit} >
                Submit Workout
            </button>
            }
        </div>

        {error && 
        <div id="error-container">
            <h1>{error}</h1>    
        </div>
        }
        <div>
        </div>
    </div>
    )
}