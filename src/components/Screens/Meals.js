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
      <body className='MealsBody'>
        <div className='MealScreenHeader'>
          Meal Page
          <br></br>
        </div>
        <div className='UploadMealButton'>
          <button onClick={nextpage}>Upload your own meal!</button>
        </div>
      </body>
    )
  }