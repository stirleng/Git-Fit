import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './UploadWorkout.css'
import { Link, useNavigate, useParams, useLocation} from 'react-router-dom';

export default function UploadWorkout(props) {
    const {currentUser} = useAuth();
    console.log(currentUser);
    return (
        <body>
            <div className='UploadScreenHeader'>
                Upload Workouts
            </div>
        </body>
    )
}