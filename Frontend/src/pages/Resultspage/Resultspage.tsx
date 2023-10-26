import './Resultspage.css'
import Navbar from '../../components/ui/NavBar/Navbar'
import JobList from '../../components/JobList/JobList'
import Filterbar from '../../components/Filterbar/Filterbar'

function Resultspage() {
  return (
    <>
        <Navbar />
        <div className='resultpage'>
            <div className='result-con'>
                <Filterbar />
                <JobList />
            </div>
        </div>      
    </>
  )
}

export default Resultspage