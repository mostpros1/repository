import React from 'react';
import './Hero.css';
import SearchBar from '../ui/SearchBar/SearchBar';
import YardIcon from '@mui/icons-material/Yard';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RoofingIcon from '@mui/icons-material/Roofing';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const PopularCardsData = [
  {
    id: 1,
    name: 'Hovenier',
    icon: <YardIcon />,
  },
  {
    id: 2,
    name: 'Elektriciën',
    icon: <ElectricBoltIcon />,
  },
  {
    id: 3,
    name: 'Loodgieter',
    icon: <PlumbingIcon />,
  },
  {
    id: 4,
    name: 'Dakdekker',
    icon: <RoofingIcon />,
  },
  {
    id: 5,
    name: 'Schoonmaken',
    icon: <CleaningServicesIcon />,
  },
];

function Hero() {
  return (
    <div className="hero">
      <div className="hero-container">
        <h2>Vind lokale vakspecialisten voor klussen in je huis en tuin</h2>
        <SearchBar />
        <article className="populairjobsHero">
          {PopularCardsData.map((card) => (
            <Link key={card.id} to={`/job/${card.name}`} className="populairjobsHeroCard">
              {card.icon}
              <span>{card.name}</span>
            </Link>
          ))}
        </article>
      </div>
    </div>
  );
}

export default Hero;
