import './Hero.css'
import searchIcon from "../../assets/icon _arrow circle right_.png"

function Hero() {
  return (
    <>
        <div className="hero">
            <div className="hero-container">
              <h2>"Ontdek <span>betrouwbare</span>, lokale experts voor elke klus in en rondom je huis en tuin."</h2>
              <div className='search-container'>
                <h4>Wat is je klus?</h4>
                <input type="text" name="" id="" placeholder='Bijvoorbeeld:loodgieter'/>
              </div>
              <div className='link-btn'>
                <a href="#">Inschrijven als vakspecialist <img src={searchIcon} alt="" /></a>
              </div>
            </div>
        </div>
    </>
  )
}

export default Hero