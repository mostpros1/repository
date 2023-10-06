import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/cropped-23107-9-tools-transparent-image 1.svg'

function Navbar() {

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
            link: '/inschrijven-als-vakspecialist'
        }
    ]

    let navItemsToBeRendered = navItems.map(Item => {
        return(
            <li key={Item.name}>
                <Link to={Item.link}>{Item.name}</Link>
            </li>
        )
    })
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
                    {navItemsToBeRendered}
                </ul>
                
                <button className="loginButton">Inloggen</button>
                </div>

            </div>
            </nav>
        </>
    ) 
}

export default Navbar