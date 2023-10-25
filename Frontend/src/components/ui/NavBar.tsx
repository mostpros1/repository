import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/cropped-23107-9-tools-transparent-image 1.svg'

function NavBar() {

    let location = useLocation();

    const navItems = [
        {
            name: 'Klussen',
            link: '/klussen'
        },
        {
            name: 'Hoe werkt het?',
            link: '/hoe-werkt-het'
        },
        {
            name: 'Inschrijven als vakspecialist',
            link: '/inschrijven-als-specialist'
        }
    ]

    let navItemsToBeRendered = navItems.map(Item => {
        return(
            <li key={Item.name}>
                <Link to={Item.link} className={location.pathname === '/' ? 'white-items' : 'black-items'}>{Item.name}</Link>
            </li>
        )
    })
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
                    {navItemsToBeRendered}
                </ul>
                
                <button className="loginButton">Inloggen</button>
                </div>

            </div>
            </nav>
        </>
    ) 
}

export default NavBar