import React, {useEffect} from 'react';
import {AuthProvider} from './contexts/AuthContext';
import SignIn from './components/Screens/SignIn';
import Signup from './components/Screens/Signup';
import Workouts from './components/Screens/Workouts';
import Meals from './components/Screens/Meals';
import UploadWorkout from './components/Screens/UploadWorkout';
import UploadMeal from './components/Screens/UploadMeal';
import WorkoutSearch from './components/Screens/WorkoutSearch';
import WorkoutPlan from './components/Screens/WorkoutPlan';
import Stats from './components/Screens/Stats';

import NewInfo from './components/Screens/NewInfo';
import Home from './components/Screens/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from './components/Screens/PrivateRoute';
import axios from "axios";
import * as cheerio from "cheerio";
import {db} from "./firebase";

async function scrapeMeals(url) {

    console.log('done!');
}


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
                    <Route path="/signup" element={<Signup/>}/>
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
