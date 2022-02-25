import SignIn from './components/Screens/SignIn';
import Signup from './components/Screens/Signup.Js';
import { AuthProvider } from './contexts/AuthContext';


function App() {
    return ( // Force both the mui textFields and Buttons to have the same font, etc.
        <AuthProvider>
             <Signup/>
        </AuthProvider>  
       

    );
}

export default App;
