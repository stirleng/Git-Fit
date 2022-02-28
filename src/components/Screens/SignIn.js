import {useAuth} from '../../contexts/AuthContext';
import React, {useState} from 'react';
import {auth} from '../../firebase.js';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextBox from "../ui/TextBox";
import MyButton from "../ui/Button"
import './signin.css'
import {Link, useNavigate} from 'react-router-dom';

function SignIn() {
    const commonProps = {className: 'inputBox', textColor: 'white', bgColor: 'black', width: 275, height: 40};

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signIn} = useAuth();
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        /*        auth.signInWithEmailAndPassword(email, password)
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
                e.preventDefault()*/

        await signIn(email, password);
        return navigate('/');
    }

    return (<div className='wrapper'>
        <div id='bottom-layer' className='signInBackground'/>
        <div id='top-layer' className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Sign In Page</h1>
                <div id='inputFieldContainer'>
                    <TextBox {...commonProps}
                             placeholder={'Email'}
                             adornment={<EmailIcon/>}
                             handler={e => setEmail(e.target.value)}/>
                    <TextBox {...commonProps}
                             type={'password'}
                             placeholder={'Password'}
                             adornment={<VpnKeyIcon/>}
                             handler={e => setPassword(e.target.value)}/>
                    <MyButton {...commonProps}
                              type='submit'
                              value={'Sign In!'}/>
                </div>
                Need an account? <Link to="/signup">Sign Up</Link>
            </form>
        </div>
    </div>);
}

export default SignIn;