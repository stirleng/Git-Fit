import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Home.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import HomePageImage from '../images/HomePageImage.jpg'
// How to use react-router-dom:
// https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
//import Button from 'react-bootstrap/Button'

export default function Home(props) {
  let navigate = useNavigate();
  
  const {currentUser} = useAuth();
  console.log(currentUser);
  return (
    <body className='HomePage'>
      <div>
      <div className='HomeScreenHeader'>
        Git-Fit
      </div>
      <div className='HomePageButtons'>
        <Link to="/workouts">
          <button type="button" className='WorkoutsPageButton'>
                Workout Button
          </button>
        </Link>
        <Link to="/meals">
          <button type="button" className='MealsPageButton'>
                Meals Button
          </button>
        </Link>
      </div>
      </div>
    </body>
  )
}