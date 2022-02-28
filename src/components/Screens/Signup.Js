import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext'
import './signup.css'
import TextBox from "../ui/TextBox";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MyButton from "../ui/Button";


function SignUp() {
    const {signUp} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //testing purpose for success signups
    const [success, setSuccess] = useState(false);
    const commonProps = {className: 'inputBox', textColor: 'white', bgColor: 'black', width: 275, height: 40};

    let navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess(false);

        console.log(password);
        console.log(confirmPassword);

        if (password !== confirmPassword) {
            setError("Password do no match");
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password);
            setSuccess(true);
            return navigate('/newinfo')
        } catch (err) {
            setError(err.message)
        }

        setLoading(false)
    }

    return (<div className='wrapper'>
        <div id='bottom-layer' className='signUpBackground'/>
        <div id='top-layer'>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up Page</h1>
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
                        <TextBox {...commonProps}
                                 type={'password'}
                                 placeholder={'Confirm your password!'}
                                 adornment={<VpnKeyIcon/>}
                                 handler={e => setConfirmPassword(e.target.value)}/>
                        {loading ?
                            <h1>Signing up, Please wait :D</h1> :
                            <MyButton {...commonProps} type='submit' value={'Sign Up!'}/>}
                    </div>
                    Already have an account? <Link to='/signin'>Sign In</Link>
                </form>
                {error && <p>{error}</p>}
                {success && <p>Successfully Signed Up!</p>}
            </div>
            <div id='corners' style={{margin: '25px 50px 75px 100px'}}>
                <h2>What is GitFit!</h2>
                <p>Nulla aliquip nulla proident elit officia sunt cillum.
                    Exercitation aliqua id ut duis tempor. Dolore labore minim
                    culpa nisi aute sit incididunt cillum duis eu nostrud nulla
                    proident adipisicing. Excepteur in dolore irure proident
                    duis ut quis aliquip duis duis minim ex incididunt nisi.
                    Deserunt officia magna ut excepteur duis cupidatat amet
                    cillum aliquip aliqua voluptate fugiat veniam. Deserunt
                    reprehenderit proident et dolore irure aute.
                    Reprehenderit quis aliqua eiusmod ex adipisicing reprehenderit
                    esse ullamco deserunt.</p>
            </div>
        </div>
    </div>);
}

export default SignUp;