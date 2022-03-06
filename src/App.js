import {AuthProvider} from './contexts/AuthContext';
import SignIn from './components/Screens/SignIn';
import Signup from './components/Screens/Signup';
import Workouts from './components/Screens/Workouts';
import Meals from './components/Screens/Meals';
import UploadWorkout from './components/Screens/UploadWorkout';
import UploadMeal from './components/Screens/UploadMeal';

import NewInfo from './components/Screens/NewInfo';
import Home from './components/Screens/Home';
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import PrivateRoute from './components/Screens/PrivateRoute';


function App() {
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
                    <Route path="/uploadworkout" element={<PrivateRoute><UploadWorkout/></PrivateRoute>}/>
                    <Route path="/meals" element={<PrivateRoute><Meals/></PrivateRoute>}/>
                    <Route path="/newinfo" element={<PrivateRoute><NewInfo/> </PrivateRoute>}/>
                    <Route path="/uploadmeal" element = {<PrivateRoute><UploadMeal/></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
