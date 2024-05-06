import './Hero.css'
import SearchBar from '../ui/SearchBar/SearchBar'

function Hero() {
  return (
    <>
        <div className="hero">
            <div className="hero-container">
              <h2>Vind lokale vakspecialisten voor klussen in je huis en tuin</h2>
              <SearchBar />
            </div>
        </div>
    </>
  )
}

export default Hero