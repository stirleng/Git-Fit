import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
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
    <div className='signUpBackground'>
      <div className='container'>
            <h1>Sign Up Page</h1>
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
                <input type="submit" />}
              </div>
            </form>
            {error && <h1>{error}</h1>}
            {success && <h1>Successfully Signedup</h1>}
            <div>
              Already have an account? <Link to='/signin'>Sign In</Link>
            </div>
        </div>
        <div>
          <h1>What is GitFit!</h1>
          <h2>Nulla aliquip nulla proident elit officia sunt cillum. 
            Exercitation aliqua id ut duis tempor. Dolore labore minim 
            culpa nisi aute sit incididunt cillum duis eu nostrud nulla
             proident adipisicing. Excepteur in dolore irure proident 
             duis ut quis aliquip duis duis minim ex incididunt nisi. 
             Deserunt officia magna ut excepteur duis cupidatat amet 
             cillum aliquip aliqua voluptate fugiat veniam. Deserunt 
             reprehenderit proident et dolore irure aute. 
             Reprehenderit quis aliqua eiusmod ex adipisicing reprehenderit 
             esse ullamco deserunt.</h2>
        </div>
    </div>
    
  );
}


export default Signup;
