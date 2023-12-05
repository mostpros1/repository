import { Link } from 'react-router-dom';

function NavLinks() {
    const navItems = [
        {
            name: 'Klussen',
            link: '/klussen'
        },
        {
            name: 'Hoe werkt het',
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