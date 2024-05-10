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
        <div className="vacature-list">
            <ul className='vacature-list-col'>
                {Object.entries(jobsDescriptions).map(([key, job]) => (
                    <li className='vacature-list-item' key={key}>
                        <h3 onClick={() => toggleText(key)}>{job.title}</h3>
                        {showText[key] && (
                            <div className='vacature-list-bg'>
                                <p id='Vacature-desc-title'>Job Description</p>
                                {job.description && <p>{job.description}</p>}
                                {job.trial && <p>{job.trial}</p>}
                                {job.technologies.length > 0 && (
                                    <>
                                        <p id='Vacature-desc-title'>Technologies</p>
                                        <ul className='tech-list'>
                                            {job.technologies.map((tech, index) => (
                                                <li key={index}>{tech}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {job.requirements.length > 0 && (
                                    <>
                                        <p id='Vacature-desc-title'>Requirements</p>
                                        <ul className='tech-list'>
                                            {job.requirements.map((tech, index) => (
                                                <li key={index}>{tech}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {job.offer.length > 0 && (
                                    <>
                                        <p id='Vacature-desc-title'>What we offer</p>
                                        <ul className='tech-list'>
                                            {job.offer.map((tech, index) => (
                                                <li key={index}>{tech}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {job.whatweask.length > 0 && (
                                    <>
                                        <p id='Vacature-desc-title'>What we ask</p>
                                        <ul className='tech-list'>
                                            {job.whatweask.map((tech, index) => (
                                                <li key={index}>{tech}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                <p id='Vacature-desc-title'>Apply</p>
                                {job.apply && <p>{job.apply}</p>}
                                {job.extrainfo.length > 0 && (
                                    <>
                                        <p id='Vacature-desc-title'>Extra information</p>
                                        <ul className='tech-list'>
                                            {job.extrainfo.map((tech, index) => (
                                                <li key={index}>{tech}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Vacatures;
