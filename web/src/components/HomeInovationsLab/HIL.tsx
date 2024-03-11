import React from 'react';
import img from '../../assets/dutch_steamboat_small 2.jpg';
import './HIL.css';

function HIL() {
    return (
        <div id="root">
            <div className="main-content">
                <div className="image-container">
                    <img src={img} alt="dutch steamboat" />
                    <div className="text-overlay">
                        <h1>Home Innovation Labs</h1>
                        <p>Sustainable Value Creation</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HIL;
