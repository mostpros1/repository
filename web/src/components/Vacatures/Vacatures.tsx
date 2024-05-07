import './Vacatures.css';
import React, { useState } from 'react';
import closecircle from '../../assets/icon_close_circle.svg';

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
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-1')}>
                        <h3>HR - IT Recruiter </h3>
                        {showText['vacature-1'] && <p id='vacature-1'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-2')}>
                        <h3>Software Engineer (Javascript, AWS, Fullstack) </h3>
                        {showText['vacature-2'] && <p id='vacature-2'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-3')}>
                        <h3>Software Tester </h3>
                        {showText['vacature-3'] && <p id='vacature-3'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-4')}>
                        <h3>Business Analyst </h3>
                        {showText['vacature-4'] && <p id='vacature-4'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-5')}>
                        <h3>UX/UI Developer </h3>
                        {showText['vacature-5'] && <p id='vacature-5'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-6')}>
                        <h3>iOS/ Android Developer </h3>
                        {showText['vacature-6'] && <p id='vacature-6'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-7')}>
                        <h3>DevOps Engineer </h3>
                        {showText['vacature-7'] && <p id='vacature-7'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-8')}>
                        <h3>Product Owner </h3>
                        {showText['vacature-8'] && <p id='vacature-8'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-9')}>
                        <h3>AI Data Engineer </h3>
                        {showText['vacature-9'] && <p id='vacature-9'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-10')}>
                        <h3>IoT Engineer </h3>
                        {showText['vacature-10'] && <p id='vacature-10'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-11')}>
                        <h3>Growth Hacker </h3>
                        {showText['vacature-11'] && <p id='vacature-11'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-12')}>
                        <h3>Business Developer </h3>
                        {showText['vacature-12'] && <p id='vacature-12'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-13')}>
                        <h3>B2B Marketing & Sales </h3>
                        {showText['vacature-13'] && <p id='vacature-13'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-14')}>
                        <h3>AI Data Marketing Analyst </h3>
                        {showText['vacature-14'] && <p id='vacature-14'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-15')}>
                        <h3>Performance Marketer (SEO, SEA, CRO) </h3>
                        {showText['vacature-15'] && <p id='vacature-15'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-16')}>
                        <h3>Marketing Automation & CRM </h3>
                        {showText['vacature-16'] && <p id='vacature-16'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-17')}>
                        <h3>Finance - IT </h3>
                        {showText['vacature-17'] && <p id='vacature-17'>Sample text add here (please save me)</p>}
                    </li>
                    <li className='vacature-list-item' onClick={() => toggleText('vacature-18')}>
                        <h3>Legal - IT </h3>
                        {showText['vacature-18'] && <p id='vacature-18'>Sample text add here (please save me)</p>}
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Vacatures;