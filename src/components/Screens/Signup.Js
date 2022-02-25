import {React, useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'

import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextBox from "../ui/TextBox";
import MyButton from "../ui/Button"

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


function Signup() {

  const centering   = { display: 'flex', justifyContent: 'center', paddingTop: '0.35%' };
  const commonProps = { textColor: 'white', bgColor: 'black', width: 275, height: 40 };

  const {signUp} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  let email    = '';
  let password = '';
  let confirmPassword = '';

  async function handleSubmit(e){
      e.preventDefault();

      if (password !== confirmPassword){
        return setError("Password do no match")
      }

      try {
        setError('')
        setLoading(true)
        signUp(email, password)
      }catch{
        setError("Failed to create an account")
      }
      setLoading(false)
  }

  return (<React.Fragment>
    <ThemeProvider theme={muiTheme}>
        
        {error && <h2>{error}</h2>}

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
        <div style = { centering }><TextBox { ...commonProps }
            type        = { 'confirm password' }
            placeholder = { 'Confirm Password' }
            adornment   = { <VpnKeyIcon/> }
            handler     = { e => confirmPassword = e.target.value }/>
        </div>
        <div style = { centering }><MyButton { ...commonProps }
            value       = { 'Sign Up!' }
            handler     = { () => handleSubmit() }/>
        </div>
    </ThemeProvider>
</React.Fragment>);
}


export default Signup;