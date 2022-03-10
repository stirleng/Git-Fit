import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'
import RunningVid from "../assets/videos/signup_background.mp4"
import '../styles/SignUp.css'
import styles from "../styles/SignIn.module.css";
import {Paper} from "@mui/material";
import TextBox from "../ui/TextBox";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MyButton from "../ui/Button";


function SignUp() {
    const commonProps = {className: styles.inputBox, textColor: 'black', bgColor: 'white', width: 450, height: 40};
    const buttonProps = {className: styles.inputBox, textColor: 'white', bgColor: '#e0b100', width: 450, height: 50};

    const {signUp} = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let errorMessage;

        if (password !== confirmPassword) {
            alert("Password do no match");
            setLoading(false); // For consistency...
            return;
        }

        await signUp(email, password)
            .then(() => {
                if (!errorMessage) navigate('/newinfo')
            })
            .catch((error) => {
                errorMessage = error.code;
                alert(error.message);
                console.log(error.message);
            });

        setLoading(false);
    }

    return (<div id="body">
        <section id="About">
            <div id="About-Text">
                <h1>What is GitFit!</h1>
                <h2><br/>GitFit is a web app that promotes a healthy living style! <br/> <br/>
                    We make it easy to organize your workout experience and maximize your time! <br/> <br/>
                    Sign up with us today and we will help you reach your goal!
                </h2>
            </div>
            <div id="video-container">
                <video id="background-video" loop autoPlay muted>
                    <source src={RunningVid} type='video/mp4'/>
                </video>
            </div>
        </section>

        <section id="signup">
            <div id="signup-background"/>
            <div id='top-layer' className='container'>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <form onSubmit={handleSubmit}>
                        <h1>Begin your Journey!</h1>
                        <TextBox {...commonProps}
                                 placeholder={'Email'}
                                 adornment={<EmailIcon/>}
                                 handler={e => setEmail(e.target.value)}/>
                        <TextBox {...commonProps}
                                 type={'password'}
                                 placeholder={'Enter your password!'}
                                 adornment={<VpnKeyIcon/>}
                                 handler={e => setPassword(e.target.value)}/>
                        <TextBox {...commonProps}
                                 type={'password'}
                                 placeholder={'Confirm your password!'}
                                 adornment={<VpnKeyIcon/>}
                                 handler={e => setConfirmPassword(e.target.value)}/>
                        {loading ?
                            <h1>Signing up, Please wait :D</h1> :
                            <MyButton {...buttonProps}
                                      type='submit'
                                      value={'SIGN UP!'}/>}
                        Already have an account? <Link to='/signin'>Sign In</Link>
                    </form>
                </Paper>
            </div>
        </section>
    </div>);
}


export default SignUp;
