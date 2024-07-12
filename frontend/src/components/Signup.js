import { useState } from 'react'
import '../styles/Signup.css'
import { useSignup } from '../hooks/useSignup';
import {Link} from 'react-router-dom'

const Signup = () => {

   const [role,setRole] = useState('');
   const [name,setName] = useState('');
   const [email,setEmail] = useState('');
   const [contact,setContact] = useState('');
   const [password,setPassword] = useState('');
   const [showPass, setShowPass] = useState(false);
   const [onPassInput, setOnPassInput] = useState(false);
   const {signup, error, isLoading } = useSignup();

   const handleSignup = async (e) => {
      e.preventDefault();
      //console.log(role,name,email,contact,password);

      await signup(role,name,email.toLowerCase(),contact,password);
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
         <form className="signup" onSubmit={handleSignup}>
            
            <div className='roles'>
            <button type='button' className={role === 'Investor' ? 'selected-role' : ''} onClick={()=>setRole('Investor')}>Investor</button>
            <button type='button' className={role === 'Founder' ? 'selected-role' : ''} onClick={()=>setRole('Founder')}>Founder</button>
            <button type='button' className={role === 'Guest' ? 'selected-role' : ''} onClick={()=>setRole('Guest')}>Guest</button>
            </div>

            <div className='input-field'>
            <label>Name:</label>
               <input 
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder='Enter Name'
               />
            </div>

            <div className='input-field'>
               <label>Email:</label>
               <input 
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Enter Email'
               />
            </div>

            <div className='input-field'>
               <label>Contact:</label>
               <input 
                  type='number'
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  placeholder='Enter Contact'
               />
            </div>

            <div className='input-field pass-input-wrapper'>
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
                  type='button' onMouseDown={handleShowPass}
               >
                  {showPass ? <i class="fa-solid fa-eye"></i>:<i class="fa-solid fa-eye-slash"></i>}
               </div>)}
            </div>

            <div><button type='submit' className='submit-btn' disabled={isLoading}>Sign Up</button></div>
            {error ? (<div className="error">{error}</div>):(<div className="not-error">Already a User? <Link to='/login'>Login</Link></div>) }
         </form>
      </div>
   </div>
    
  )
}

export default Signup