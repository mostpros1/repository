import { Link } from 'react-router-dom';

import taal from "./MobileNav";

function NavLinks() {
    const navItems = [
        {
            name: 'Klussen',
            link: `/${taal}/mijn-klussen`
        },
        {
            name: 'Hoe werkt het',
            link: `/${taal}/hoe-werkt-het`
        },
        {
            name: 'Inschrijven als vakspecialist',
            link: `/${taal}/pro-onboarding`
        },
        {
        name: 'HIL',
        link: `/${taal}/home-inovations-lab`
    }
    ]

    const navItemsToBeRendered = navItems.map(Item => {
        return(
            <li key={Item.name}>
                <Link to={Item.link} className='black-items'>{Item.name}</Link>
            </li>
        )
    })
  return (
    <>
        <ul className="nav-list">
          {navItemsToBeRendered}
        </ul> 
    </> 
  )
}

export default NavLinks