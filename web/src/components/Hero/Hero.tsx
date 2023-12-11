import './Hero.css'
import SearchBar from '../ui/SearchBar/SearchBar'
import searchIcon from "../../assets/icon _arrow circle right_.png"
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
        <div className="hero">
            <div className="hero-container">
              <h2>Vind lokale vakspecialisten voor klussen in je huis en tuin</h2>
              <SearchBar />
              <Link to="/inschrijven-als-specialist" className='link-btn'>
                <p>Inschrijven als vakspecialist</p><img src={searchIcon} alt="" />
              </Link>
            </div>
        </div>
    </>
  )
}

export default Hero