import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate =useNavigate()

    return (
        <div>
            <div className="page-error">
                <h1>There is no page in such route</h1>
                <h1>Go to <span className='story-homepage-button' onClick={() => navigate("/home")}>homepage</span>.</h1>
            </div>
        </div>
    );
};

export default NotFound;