import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader'
import './skeletons.css'
const LoginLoading = () => {
    return (
        <div className='login-loading'>
          <div className="clock-loader">
                <ClockLoader
                color="#0072ea"
                size={50}
                speedMultiplier={4}
                />
          </div>
        </div>
    );
};

export default LoginLoading;