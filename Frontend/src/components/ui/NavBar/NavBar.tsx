import './NavBar.css';
import Navigation from './Navigation';
import MobileNav from './MobileNav';

function NavBar() {
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