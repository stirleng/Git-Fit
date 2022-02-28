import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextBox from "../ui/TextBox";
import MyButton from "../ui/Button"

import './signin.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate} from 'react-router-dom';

const muiTheme = createTheme({
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



function SignIn() {
    const centering   = { display: 'flex', justifyContent: 'center', paddingTop: '0.35%' };
    const commonProps = { textColor: 'white', bgColor: 'black', width: 275, height: 40 };

    let email    = '';
    let password = '';

    const {signIn} = useAuth();
    let navigate = useNavigate();

    async function userSignIn(e) {
        // auth.signInWithEmailAndPassword(email, password)
        //     .catch(function(error) {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         if (errorCode === 'auth/wrong-password')
        //             alert('Wrong password.');
        //         else
        //             alert(errorMessage);
        //         console.log(error);
        //     });
        //e.preventDefault()

        try{
            console.log("HERE")
            await signIn(email,password);
            return navigate('/')
        }catch(err){
            alert(err.message)
        }

    }

    return (<React.Fragment>
    <div>
        <div className='wrapper'>
                <div className='bottom-layer'>
                    <div className='background'/>
                </div>
                <div className='top-layer'>
                    <ThemeProvider theme={muiTheme}>
                        <div style = { centering }><TextBox { ...commonProps }
                            placeholder = { 'Email' }
                            adornment   = { <EmailIcon/> }
                            handler     = { e => email = e.target.value }/>
                        </div>
                        <div style = { centering }><TextBox { ...commonProps }
                            type        = { 'password' }
                            placeholder = { 'Password' }
                            adornment   = { <VpnKeyIcon/> }
                            handler     = { e => password = e.target.value }/>
                        </div>
                        <div style = { centering }><MyButton { ...commonProps }
                            value       = { 'Sign In!' }
                            handler     = { () => userSignIn() }/>
                        </div>
                        <div>
                             Need an account? <Link to="/signup">Sign Up</Link>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
            
         
    </div>
       
    </React.Fragment>);
}

export default SignIn;