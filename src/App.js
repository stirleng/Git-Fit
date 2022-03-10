import React, {useEffect} from 'react';
import {AuthProvider} from './contexts/AuthContext';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Workouts from './components/screens/Workouts';
import Meals from './components/screens/Meals';
import UploadWorkout from './components/screens/UploadWorkout';
import UploadMeal from './components/screens/UploadMeal';
import WorkoutSearch from './components/screens/WorkoutSearch';
import WorkoutPlan from './components/screens/WorkoutPlan';
import Stats from './components/screens/Stats';

import NewInfo from './components/screens/NewInfo';
import Home from './components/screens/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from './components/screens/PrivateRoute';
import axios from "axios";
import * as cheerio from "cheerio";
import {db} from "./contexts/firebase";


function App() {
    useEffect(() => {
        const fetchData = async (url) => {
            const proteinSources = ['beef', 'chicken', 'pork', 'tofu', 'fish', 'beans'];

            // Helper functions
            const getFloat = (str) => parseFloat(str.match(/[0-9.]+/g));
            const getAttribute = ($, str) => $('.prodwebcode')
                .text().toLowerCase().indexOf(str);
            const getIngredient = ($, str) => $('.ingred_allergen').find('p').first()
                .text().toLowerCase().indexOf(str);

            await axios.get(url).then(response => {
                const data = cheerio.load(response.data);
                data('.menu-item').each((i, e) => {
                    const dishLink = data(e).find('a').attr('href');

                    axios.get(dishLink).then(async response => {
                        const data = cheerio.load(response.data);
                        let dishName = data('.recipecontainer').find('h2').text();

                        if (dishName === '') return; // Ignore entry if meal is invalid.

                        await db.doc('meals/' + dishName.replace(/ /g, '_')).set({
                            DishName: dishName,
                            link: dishLink,
                            isVegetarian: getAttribute(data, 'vegetarian') + getAttribute(data, 'vegan') > -1,
                            isWhiteMeat: getAttribute(data, 'contains fish') + getIngredient(data, 'chicken') > -1,
                            Protein: proteinSources.find(i => getIngredient(data, i) > -1) || '',
                            Protein_Grams: getFloat(data('.nfnutrient').text()),
                            Calories: getFloat(data('.nfcal').text()),
                        }, {merge: true});
                    }).catch(() => null);
                });
            }).catch(() => null);
        };
        fetchData('https://menu.dining.ucla.edu/Menus/BruinPlate/Lunch');
    }, []);

    return (
        //First goes to Root which is /, but since we aren't signed in
        //it will redirect to signup.
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/workouts" element={<PrivateRoute><Workouts/></PrivateRoute>}/>
                    <Route path="/workoutplan" element={<PrivateRoute><WorkoutPlan/></PrivateRoute>}/>
                    <Route path="/uploadworkout" element={<PrivateRoute><UploadWorkout/></PrivateRoute>}/>
                    <Route path="/workoutsearch" element={<PrivateRoute><WorkoutSearch/></PrivateRoute>}/> 
                    <Route path="/meals" element={<PrivateRoute><Meals/></PrivateRoute>}/>
                    <Route path="/newinfo" element={<PrivateRoute><NewInfo/> </PrivateRoute>}/>
                    <Route path="/uploadmeal" element={<PrivateRoute><UploadMeal/></PrivateRoute>}/>
                    <Route path="/stats" element={<PrivateRoute><Stats/></PrivateRoute>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
