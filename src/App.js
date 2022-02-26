import SignIn from './components/Screens/SignIn'
import Signup from './components/Screens/Signup';
import { AuthProvider } from './contexts/AuthContext';
import "./components/Screens/signup.css"

import {Routes, Route, Link} from "react-router-dom";

function App() {
    return ( // Force both the mui textFields and Buttons to have the same font, etc.
      
     // <SignIn />
      
     
          <Routes>      
            <Route path="/" element={
                 <AuthProvider>
                    <Signup/>
                 </AuthProvider>
                } />
            <Route path="/signin" element={<SignIn/>} />
          </Routes>    

       
       

    );
}

export default App;
