import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Meals.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function Workouts(props) {
    const {currentUser} = useAuth();
    console.log(currentUser);
    return (
      <div>
        <div className='MealScreenHeader'>
          Meal Page
        </div>
      </div>
    )
  }