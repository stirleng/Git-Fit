import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Workouts.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function Workouts(props) {
    const {currentUser} = useAuth();
    console.log(currentUser);
    return (
      <body>
        <div>
          <div>
            Workout Page
          </div>
        </div>
      </body>
    )
  }