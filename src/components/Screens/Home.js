import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Home.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import '../images/HomePageBackground.jpg'
import '../images/BarbellImage.png'
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
      <div className='HomePageButtonContainer'>
        <Link to="/workouts">
          <button type="button" className='HomePageButtons WorkoutsPageButton'>
                Your Workouts
                <br></br>
                <img src={require('../images/BarbellImage.png')} className='BarbellImage'/>
                <div className='NavFromHomeArrow'>
                 &#8594;
                </div>
          </button>
        </Link>
        <Link to="/meals">
          <button type="button" className='HomePageButtons MealsPageButton'>
                Your Meals
          </button>
        </Link>
      </div>
      </div>
    </body>
  )
}