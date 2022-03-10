import {useAuth} from '../../contexts/AuthContext';
import React, {useEffect, useState} from 'react';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextBox from "../ui/TextBox";
import MyButton from "../ui/Button"
import styles from '../styles/SignIn.module.css'
import globalStyles from '../styles/Global.module.css'
import {Link, useNavigate} from 'react-router-dom';
import Logo from "../ui/Logo";

function SignIn() {
    const commonProps = {className: styles.inputBox, textColor: 'black', bgColor: 'white', width: 375, height: 40};
    const buttonProps = {className: styles.inputBox, textColor: 'white', bgColor: '#e0b100', width: 375, height: 50};

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signIn} = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        document.body.setAttribute('style',
            `position: fixed; top: -$(this.windowOffset)px; left: 0; right: 0;`);

        return () => {
            document.body.setAttribute('style', '');
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await signIn(email, password)
            .catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password')
                    alert('Wrong password.');
                else
                    alert(errorMessage);
            });
        return navigate('/');
    }

    return (<div className={styles.wrapper}>
        <div id='bottom-layer' className={styles.signInBackground}/>
        <div id='top-layer' className={styles.slide}
             style={{
                 background: '#e0b100',
                 transform: 'rotate(7deg) translate(-12%, -5%)'
             }}/>

        <div id='top-layer' className={styles.slide}/>
        <Logo id='top-layer'/>

        <div id='top-layer' className={styles.container}>
            <div className={globalStyles.card}>
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back!</h1>
                    <TextBox {...commonProps}
                             placeholder={'Email'}
                             adornment={<EmailIcon/>}
                             handler={e => setEmail(e.target.value)}/>
                    <TextBox {...commonProps}
                             type={'password'}
                             placeholder={'Password'}
                             adornment={<VpnKeyIcon/>}
                             handler={e => setPassword(e.target.value)}/>
                    <MyButton {...buttonProps}
                              type='submit'
                              value={'SIGN IN!'}/>
                    Need an account? <Link to="/signup">Sign Up</Link>
                </form>
            </div>
        </div>
    </div>);
}

export default SignIn;