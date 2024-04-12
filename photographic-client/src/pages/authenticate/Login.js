import React, { useState } from 'react';
import logo from '../../images/photographicLogo.png';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoginLoading from '../../components/loadingSkeletons/LoginLoading'

const Login = () => {
    const navigate = useNavigate()
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [loading , setLoading] = useState(false)
    const handleLogin = () =>{

        if (email && password ) {
            setLoading(true)
            fetch('https://photographic-server.onrender.com/auth/login',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                  email,
                  password,
                })
              }).then(res => res.json() ).then(data =>{
                setLoading(false)
                if (data.error) {
                    toast.error(data.error)
                }else{
                  sessionStorage.setItem("token",data.token);
                  sessionStorage.setItem("myId",data._id);
                  sessionStorage.setItem("myDp",data.photo);
                    toast.success(data.message);
                    navigate("/")
                }

                })
        }else{
          toast.error("Please add all the fields properly")
        }
    }

    return (
        <div className='login-con'>
            <img src={logo} alt="" className="auth-logo" />
            <p id="sign-up-text">Login with your account</p>
            <input  onChange={(e)=> setEmail(e.target.value)}  type="email" className="input-field" placeholder='email' name='email' required/>
            <input  onChange={(e)=> setPassword(e.target.value)}  type="password" className="input-field" placeholder='password' name='password' required/>

            <input onClick={()=> handleLogin()} type="submit" value="Log In" class="login-button"/>
           {loading && <LoginLoading />}
        </div>
    );
};

export default Login;