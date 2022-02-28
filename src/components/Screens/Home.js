import React from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function Home() {

  const {currentUser} = useAuth();
  console.log(currentUser);
  return (
    <div>
      <div className='HomeScreenHeader'>
        Home Page
      </div>
      <div className='HomePageButtons'>
        <div className='WorkoutsPageButton'>
          Workout Button
        </div>
        <div className='MealsPageButton'>
          Meals Button
        </div>
      </div>
    </div>
  )
}