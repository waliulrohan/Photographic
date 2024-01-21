import React, { useState } from 'react';
import './login.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Authenticate = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState(false)

    const handleNewUser = () => {
        setNewUser(!newUser);
        if (newUser) {
            navigate('login')
        }
        else if (!newUser) {
            navigate('signUp')
        }
    }
    return (
        <div className="authenticate-con">
             <div>
                <Outlet />

             </div> 
                <div className="newUser">
                    {
                        !newUser ?
                            <p>Don't have a account?  <span id='toggle-newUser' onClick={() => handleNewUser()} > Sign up</span></p>
                            :
                            <p>Have a account?<span id='toggle-newUser' onClick={() => handleNewUser()}  > Log in</span></p>

                    }
                </div>
         

        </div>
    );
};

export default Authenticate;