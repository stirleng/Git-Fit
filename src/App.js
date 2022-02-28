import {AuthProvider} from './contexts/AuthContext';
import SignIn from './components/screens/SignIn';
import Home from './components/screens/Home';
import NewInfo from './components/screens/NewInfo';

import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import PrivateRoute from './components/screens/PrivateRoute';
import {createTheme} from "@mui/material";

export const muiTheme = createTheme({
    typography: {
        allVariants: {
            margin: 0,
            fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                'sans-serif'].join(','),
            webKitFontSmoothing: 'antialiased',
            mozOsxFontSmoothing: 'grayscale',
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.4375em',
        },
    },
});

function App() {
    return (
        //First goes to Root which is /, but since we aren't signed in
        //it will redirect to signup.
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/signup" element={<Home/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/newinfo" element={<PrivateRoute><NewInfo/> </PrivateRoute>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
