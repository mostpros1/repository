import "./HomePageTwo.css";
import YardIcon from "@mui/icons-material/Yard";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import RoofingIcon from "@mui/icons-material/Roofing";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Link } from 'react-router-dom';
import { taal } from '../ui/NavBar/Navigation.tsx';

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
    name: 'Schoonmaker',
    icon: <CleaningServicesIcon />,
  },
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
];



function HomePageTwo() {
  return (
    <main className="homepagetwomain">
      <section className="landingSectionHome">
        <article className="landingContentHome">
          <section className="titleSectionHome">
            <h2 className="titleSectionHomeH2">
              Vind lokale vakspecialisten <br></br> voor klussen in je huis en
              tuin
            </h2>
          </section>
          <section className="SearchSectionHome">
            <article className="SearchBarHome">
              <input
                className="SearchBarInputHome"
                type="text"
                placeholder="Wat is je klus?"
              />
              <article className="searchBarBlueIcon"></article>
            </article>
          </section>
          <section className="JobsSectionHome">
            <article className="populairjobsHero">
              {PopularCardsData.map((card) => (
                <Link
                  key={card.id}
                  to={`/${taal}/jobs#${card.name.toLowerCase()}`}
                  className="populairjobsHeroCard"
                >
                  {card.icon}
                  <span>{card.name}</span>
                </Link>
              ))}
            </article>
          </section>
        </article>
      </section>
    </main>
  );
}

export default HomePageTwo;
