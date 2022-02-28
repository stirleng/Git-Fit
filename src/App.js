
import { AuthProvider } from './contexts/AuthContext';


//Screens
import SignIn from './components/Screens/SignIn';
import Signup from './components/Screens/Signup';
import Home from './components/Screens/Home';
import NewInfo from './components/Screens/NewInfo';

import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import PrivateRoute from './components/Screens/PrivateRoute';

function App() {
    return ( // Force both the mui textFields and Buttons to have the same font, etc.
      
    //First goes to Root which is /, but since we aren't signed in
    //it will redirect to signup.
      
     <Router>
       <AuthProvider>
          <Routes>    
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />   
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/newinfo" element = {<PrivateRoute><NewInfo/> </PrivateRoute>} /> 
        </Routes>
      </AuthProvider>    
     </Router>
         

       
       

    );
}

export default App;
