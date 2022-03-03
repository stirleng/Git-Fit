import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import RunningVid from "../videos/signup_background.mp4"
import BackgroundImage from "../images/facilities_JWC_1156x420.jpg"
import './signup.css'





function Signup() {



  const {signUp} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  //testing purpose for success signups
  const [success, setSuccess] = useState(false);



  let navigate = useNavigate();

  async function handleSubmit(e){

      e.preventDefault();

      setSuccess(false);

      console.log(password);
      console.log(confirmPassword);

      

      if (password !== confirmPassword){
        setError("Password do no match");
        return;
      }



      try {
        setError('')
        setLoading(true)
        await signUp(email, password)
        setSuccess(true)
        return navigate('/newinfo')
      }catch(err){
        setError(err.message)
      }
      
      setLoading(false)
  }

  return ( 
    <>
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
      <div id="signup-background"></div>
      <div id="intro-back">
          <h1 id="intro-text">Sign up with Git-Fit and Begin with your Journey!</h1>
        </div>  
      <div className='container'>
              <form onSubmit={handleSubmit} >
                <div id='inputFieldContainer'>
                  <input 
                    className='inputBox' 
                    placeholder='Enter your email!'
                    type="text"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                  />
                  <input 
                    className='inputBox'
                    placeholder='Enter your password!'
                    type="password"
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}
                  />
                  <input 
                    className='inputBox'
                    placeholder='Confirm your password!'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>setConfirmPassword(e.target.value)}
                  />
                  
                  {loading? 
                  <h1>Signing up, Please wait :D</h1>:
                  <input className='inputBox' type="submit" />}
                </div>
              </form>
              {error && <h1>{error}</h1>}
              {success && <h1>Successfully Signedup</h1>}
              <div>
                Already have an account? <Link to='/signin'>Sign In</Link>
              </div>
          </div>
    </section>
  </>
    
    
  );
}


export default Signup;
