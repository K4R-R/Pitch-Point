import { useState } from 'react'
import '../styles/Signup.css'
import { useLogin } from '../hooks/useLogin';
import {Link} from 'react-router-dom';

const Login = () => {

   const [email,setEmail] = useState('');
   //const [contact,setContact] = useState('');
   const [password,setPassword] = useState('');
   const {login, error, isLoading } = useLogin();
   const [showPass, setShowPass] = useState(false);
   const [onPassInput, setOnPassInput] = useState(false);

   const handleLogin = async (e) => {
      e.preventDefault();
      //console.log(email,password);

      await login(email.toLowerCase(),password);
   }

   const handleShowPass = (e) => {
      e.preventDefault();
      setShowPass(!showPass);
   }

  return (
   
   <div className="container">
      <div className="signup-form">
         <div className="site-name">
            <h1>PITCH POINT</h1>
            <p>For Investors, Founders and More</p>
            <div className="social-medias">
               <a href='https://www.linkedin.com/in/karan-raghuwanshi/'><i className="fa-brands fa-instagram"></i></a>
               <a href='https://www.linkedin.com/in/karan-raghuwanshi/'><i className="fa-brands fa-linkedin"></i></a>
               <a href='https://www.linkedin.com/in/karan-raghuwanshi/'><i className="fa-brands fa-x-twitter"></i></a>
            </div>
         </div>
         <form className="signup" onSubmit={handleLogin}>
                     
            <div className='input-field login-field'>
               <label>Email:</label>
               <input 
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Enter Email'
               />
            </div>

            <div className='input-field login-field pass-input-wrapper'>
               <label>Password:</label>
               <input 
                  type={showPass ? 'text':'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='Enter Password'
                  onFocus={()=>setOnPassInput(true)}
                  onBlur={()=>setOnPassInput(false)}
               />
               {onPassInput && (<div 
                  className='show-password' 
                  onMouseDown={handleShowPass}
               >
                  {showPass ? <i class="fa-solid fa-eye"></i>:<i class="fa-solid fa-eye-slash"></i>}
               </div>)}
            </div>

            <div><button className='submit-btn login-btn' disabled={isLoading}>Login</button></div>
            {error ? (<div className="error">{error}</div>):(<div className="not-error">New User? <Link to='/signup'> Signup</Link></div>) }
         </form>
         
      </div>
   </div>
    
  )
}

export default Login