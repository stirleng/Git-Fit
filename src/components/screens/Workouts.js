import React from 'react'
import {useAuth} from '../../contexts/AuthContext'
import '../styles/Workouts.css'
import {Link} from 'react-router-dom';

export default function Workouts() {

    return (
        <body className='WorkoutPage'>
        <div className='WorkoutScreenHeader'>
            Your Workouts
        </div>
        <div className='WorkoutPageButtonContainer'>
            <Link to="/workoutsearch">
                <button type="button" className='WorkoutPageButtons SearchButton'>
                    Workout Search
                </button>
            </Link>
            <Link to="/uploadworkout">
                <button type="button" className='WorkoutPageButtons UploadButton'>
                    Upload Workout
                </button>
            </Link>
            <Link to="/workoutplan">
                <button type="button" className='WorkoutPageButtons PlanButton'>
                    Create Plan
                </button>
            </Link>
        </div>
        </body>
    )
}