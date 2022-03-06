import React, {useState}from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './UploadWorkout.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function UploadWorkout(props) {
    const {setWorkout} = useAuth();


    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  
    //input to db
    const [catergoy, setCategory] = useState("chest");
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [intensity, setIntensity] = useState("low");
    const [name, setName] = useState("");
    const [workoutLink, setWorkoutLink] = useState("")

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
        if(!workoutLink.includes("youtube.com")){
            setError("invalid link, use youtube")
            setLoading(false)
            return
        }

        try{
            //setWorkout(category, caloriesBurned, intensity, name, workoutLink)
            await setWorkout(catergoy, caloriesBurned, intensity, name, workoutLink)
            setLoading(false)
            console.log("Success")
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
               <select name="selectCategoty" id="category-input" value={catergoy} onChange={(e) =>setCategory(e.target.value)}>
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
               <select name="selectCategoty" id="category-input" value={intensity} onChange={(e) =>setIntensity(e.target.value)}>
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
                <h1 id="input-question">Youtube Link of the workout!</h1>
                <input 
                className='inputBox'
                type="text"
                value={workoutLink}
                onChange={(e) =>setWorkoutLink(e.target.value)}
                />
            </div>
            

        </div>

        <div id="submit-container">
            {loading? <h1>Uploading your meal, please wait!</h1> : 
            <button onClick={handleSubmit} >
                submit
            </button>
            }
        </div>

        {error && 
        <div id="error-container">
            <h1>{error}</h1>    
        </div>
        }
        

    </div>
    )
}