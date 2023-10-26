import { Link, useLocation } from 'react-router-dom';

function NavLinks() {
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
  return (
    <>
        {navItemsToBeRendered}
    </> 
  )
}

export default NavLinks