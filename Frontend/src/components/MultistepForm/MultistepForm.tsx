import './Multistepform.css'

import TwoWorkers from '../../assets/2personenmettools.png' 

function MultistepForm() {
  return (
    <div className='form-con'>
        <div className='content-con'>
            <img src={TwoWorkers} alt="" />
            <h2>Voer je postcode in om vakspecialisten in jouw omgeving te vinden</h2>
        </div>
        <div className='form-inputs'>
            <input type="text" className='form-input first-input' placeholder='Postcode'/>
            <input type="text" className='form-input second-input' placeholder='Stad'/> 
        </div>     
        <button className='next'>Verder</button> 
    </div>
  )
}

export default MultistepForm