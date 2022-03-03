import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Workouts.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function Workouts(props) {
    const {currentUser} = useAuth();
    console.log(currentUser);
    return (
      <body className='WorkoutPage'>
        <div className='WorkoutScreenHeader'>
          Workout Page
        </div>
        <div className='WorkoutPageButtonContainer'>
          <Link to="/workoutsearch">
            <button type="button" className='WorkoutPageButtons SearchButton'>
              Workout Search
            </button>
          </Link>
          <Link to="/randomworkout">
            <button type="button" className='WorkoutPageButtons RandomButton'>
              Random Workout
            </button>
          </Link>
          <Link to="/uploadworkout">
            <button type="button" className='WorkoutPageButtons UploadButton'>
              Upload Workout
            </button>
          </Link>
          <Link to="/workouthistory">
            <button type="button" className='WorkoutPageButtons HistoryButton'>
              Workout History
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