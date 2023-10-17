import React from 'react'
import Navbar from '../../components/ui/Navbar'
import MultistepForm from '../../components/MultistepForm/MultistepForm'
import Testform from '../../components/MultistepForm/Testform'

import './Klussenpage.css'

function Klussenpage() {
  return (
    <>
        <Navbar />
        <div className='viewport'>
          <MultistepForm />
          <Testform />
        </div>
    </>
  )
}

export default Klussenpage