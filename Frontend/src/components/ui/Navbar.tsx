import './Navbar.css';
import Logo from '../../assets/cropped-23107-9-tools-transparent-image 1.svg'

function Navbar() {
    return(
        <>
            <nav className='nav'>  
            <div className="nav-container">
                <div className="nav-leftside">
                    <img src={Logo} alt="" />
                    <h1>Mostpros</h1>
                </div>
            
                <div className="nav-rightside">
                <ul className='nav-list'>
                    <li><a href="#">Klussen</a></li>
                    <li><a href="#">Hoe werkt het?</a></li>
                    <li><a href="#">Inschrijven als vakspecialist</a></li>
                </ul>
                
                <button className="loginButton">Inloggen</button>
                </div>

            </div>
            </nav>
        </>
    ) 
}

export default Navbar