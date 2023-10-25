import './ResultsPage.css'
import Navbar from '../../components/ui/NavBar'
import JobList from '../../components/JobList/JobList'
import FilterBar from '../../components/FilterBar/FilterBar'

function ResultsPage() {
  return (
    <>
        <Navbar />
        <div className='resultpage'>
            <div className='result-con'>
                <FilterBar />
                <JobList />
            </div>
        </div>      
    </>
  )
}

export default ResultsPage