import { useState } from 'react';
import { Link } from 'react-router-dom';
import { taal } from "./MobileNav";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function NavLinks({ toggleSidebar }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navItems = [
        {
            name: 'Account',
            link: `/${taal}/account`,
            id: 1,
        },
        {
            name: 'Dashboard',
            link: ``,
            id: 2,
            subItems: [
                {
                    name: 'Klussen',
                    link: `/${taal}/pro-klussen`,
                    id: 2.1,
                },
                {
                    name: 'Berichten',
                    link: `/${taal}/pro-chat`,
                    id: 2.3,
                },
                {
                    name: 'Kalender',
                    link: ``,
                    id: 2.4,
                },
                {
                    name: 'Betalingen',
                    link: `/${taal}/pro-chat`,
                    id: 2.5,
                },
                {
                    name: 'Reviews',
                    link: `/${taal}/pro-chat`,
                    id: 2.6,
                },
                {
                    name: 'Profiel',
                    link: `/${taal}/pro-chat`,
                    id: 2.7,
                },
                {
                    name: 'Instellingen',
                    link: `/${taal}/pro-chat`,
                    id: 2.8,
                },
                {
                    name: 'HelpDesk',
                    link: `/${taal}/pro-chat`,
                    id: 2.9,
                },
            ],
        },
        {
            name: 'Klussen',
            link: `/${taal}/mijn-klussen`,
            id: 3,
        },
        {
            name: 'Hoe werkt het',
            link: `/${taal}/hoe-werkt-het`,
            id: 4,
        },
        {
            name: 'Inschrijven als vakspecialist',
            link: `/${taal}/pro-onboarding`,
            id: 5,
        },
        {
            name: 'HIL',
            link: `/${taal}/home-inovations-lab`,
            id: 6,
        },
    ];

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="nav-list-container">
            <div className="close-icon" onClick={toggleSidebar}>
                <p>Close Menu</p>
                <CloseIcon />
            </div>
            <ul className="nav-list">
                {navItems.map((item) => (
                    <li key={item.id} className={item.subItems ? 'dropdown-item' : ''}>
                        <div className="nav-link-wrapper" onClick={item.subItems ? handleDropdownToggle : toggleSidebar}>
                            <Link to={item.link} className="black-items">
                                {item.name}
                            </Link>
                            {item.subItems && <KeyboardArrowDownIcon className="dropdown-icon" style={{ fontSize: '1.5rem' }} />}
                        </div>
                        {item.subItems && dropdownOpen && (
                            <ul className="dropdown">
                                {item.subItems.map((subItem) => (
                                    <li key={subItem.id}>
                                        <Link to={subItem.link} className="black-items" onClick={toggleSidebar}>
                                            {subItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavLinks;
