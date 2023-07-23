import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './Webcam.css';

function TempButton(){
    const navigate = useNavigate(); // useHistory 대신 useNavigate를 사용
    
    function handleSubmit(e) {
        e.preventDefault();
        navigate('/Game1');
    }

    return (
        <button className="btn btn-large btn-primary " onClick={handleSubmit}>NEXT PAGE</button>
    );
}

export default TempButton;