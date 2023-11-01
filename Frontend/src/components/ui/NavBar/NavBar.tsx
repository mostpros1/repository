import './NavBar.css';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import MobileNav from './MobileNav';

function NavBar() {

    let location = useLocation();

    return(
        <>
            <nav className='nav'>  
                <Navigation />
                <MobileNav />
            </nav>
        </>
    ) 
}

export default NavBar