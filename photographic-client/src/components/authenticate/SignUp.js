import React, { useState } from 'react';
import logo from '../../images/photographicLogo.png'
import './login.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const SignUp = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');


  const emailRegex = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
  ;

    const handleSignUp = () =>{
        if (email && name && username && password ) {
          if (!emailRegex.test(email)) {
            toast.error("Only support  @gmail.com")
            return
          } 


            fetch('http://localhost:5000/auth/signUp',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                name,
                username,
                  email,
                  password,
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toast.error(data.error)
                }else{
                                      navigate("/authenticate/login")
                    toast.success(data.message)
                }

                })
        }else{
          toast.error("Please add all the fields properly")
        }
    }

    return (
        <div className='login-con'>



           <img src={logo} alt="" className="auth-logo" />
                        <p id="sign-up-text">Sign up to see photos <br /> from your friends.</p>
            <input onChange={(e)=> setName(e.target.value)} type="text" className="input-field" placeholder='full name' name='name' required />
            <input onChange={(e)=> setUsername(e.target.value)} type="text" className="input-field" placeholder='username' name='username' required />
            <input onChange={(e)=> setEmail(e.target.value)} type="email" className="input-field" placeholder='email' name='email' required/>
            <input onChange={(e)=> setPassword(e.target.value)} type="password" className="input-field" placeholder='password' name='password' required/>
            <input onClick={()=> handleSignUp()} type="submit" value="Sign up" class="login-button"/>


            <p id="sign-up-text" style={{fontSize:'.7rem', fontWeight:'400'}}>By signing up, you agree to our Terms , Privacy <br /> Policy and Cookies Policy .</p>
        </div>
    );
};

export default SignUp;