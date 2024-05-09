import './Vacatures.css';
import jobsDescriptions from './JobDescriptions';
import React, { useState } from 'react';

const Vacatures = () => {
    const [showText, setShowText] = useState({});

    const toggleText = (vacatureId) => {
        setShowText((prevShowText) => ({
            ...prevShowText,
            [vacatureId]: !prevShowText[vacatureId]
        }));
    };

    return (
        <>
            <div className="vacature-list">
                <ul className='vacature-list-col'>
                    {Object.entries(jobsDescriptions).map(([key, job]) => (
                        <li className='vacature-list-item'>
                            <h3 key={key} onClick={() => toggleText(key)}>{job.title}</h3>
                            {showText[key] && <div className='vacature-list-bg'>
                                <p id='Vacature-desc-title'>Job Description</p>
                                <p id={key}>{job.description}</p>
                                <p id='Vacature-desc-title'>What are you going to do?</p>
                                <p id={key}>{job.trial}</p>
                                <p id='Vacature-desc-title'>Technologies</p>
                                <ul className='tech-list'>
                                    {job.technologies.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                                <p id='Vacature-desc-title'>Pre if you have experience with:</p>
                                <ul className='tech-list'>
                                    {job.requirements.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                                <p id='Vacature-desc-title'>What we offer</p>
                                <ul className='tech-list'>
                                    {job.offer.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                                <p id='Vacature-desc-title'>What we ask</p>
                                <ul className='tech-list'>
                                    {job.whatweask.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                                <p id='Vacature-desc-title'>Apply</p>
                                <p id={key}>{job.apply}</p>
                                <p id='Vacature-desc-title'>Extra information</p>
                                <ul className='tech-list'>
                                    {job.extrainfo.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </div>}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Vacatures;