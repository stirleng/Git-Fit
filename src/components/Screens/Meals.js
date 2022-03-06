import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Meals.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function Workouts(props) {
    const {currentUser} = useAuth();
    console.log(currentUser);
    let navigate = useNavigate()
    function nextpage() {
      return navigate('/uploadmeal')
    }
    return (
      <div>
        <div className='MealScreenHeader'>
          Meal Page
        </div>

        
        <div>
          <button onClick={nextpage}>Upload your own meal!</button>
        </div>
      </div>
    )
  }