import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import './Signup.css'
import { FaLock } from 'react-icons/fa'; // Import the lock icon

 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
    <main className='container'>        
        <section className='main-section'>
        <div className="lock-container">
          <div className="circle">
            <FaLock className="lock-icon" />
          </div>
          <h1 className='main-heading' >Weather App</h1>
        </div>
            <div>
                <div>                  
                    <form>                                                                                            
                        <div>
                           
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                          
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button className='btn'
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p className='p-tag'>
                        Already have an account?{' '}
                        <NavLink style={{ textDecoration: 'none',color:'#644a5d' }} to="/login">
  Sign in
</NavLink>

                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup