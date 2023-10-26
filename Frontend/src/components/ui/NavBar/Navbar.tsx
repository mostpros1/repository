import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import NavLinks from './NavLinks';
import Logo from '../../../assets/cropped-23107-9-tools-transparent-image 1.svg'

function Navbar() {

    let location = useLocation();

    return(
        <>
            <nav className={location.pathname === '/' ? 'nav' : 'other-nav'}>  
            <div className="nav-container">
                <Link to='/'>
                    <div className="nav-leftside">
                        <img src={Logo} alt="" />
                        <h1 className={location.pathname === '/' ? 'white-h1' : 'black-h1'}>Mostpros</h1>
                    </div>
                </Link>      
                <div className="nav-rightside">
                <ul className='nav-list'>
                    <NavLinks />
                </ul>     
                <button className="loginButton">Inloggen</button>
                </div>

            </div>
            </nav>
        </>
    ) 
}

export default Navbar