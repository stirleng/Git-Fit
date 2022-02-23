import React from 'react';
import { auth } from '../firebase.js';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextBox from "./ui/TextBox";
import MyButton from "./ui/Button"

function SignIn() {
    const centering   = { display: 'flex', justifyContent: 'center', paddingTop: '0.35%' };
    const commonProps = { textColor: 'white', bgColor: 'black', width: 275, height: 40 };

    let email    = '';
    let password = '';

    function userSignIn() {
        auth.signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password')
                    alert('Wrong password.');
                else
                    alert(errorMessage);
                console.log(error);
            });
    }

    return (<React.Fragment>
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
    </React.Fragment>);
}

export default SignIn;