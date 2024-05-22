import "./HomePageTwo.css";
import YardIcon from "@mui/icons-material/Yard";
import React, { useState } from "react";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import RoofingIcon from "@mui/icons-material/Roofing";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import StarIcon from "@mui/icons-material/Star";
import WhyMostProsImg from "../../assets/workingman.png";
import Allin1ServiceImg from "../../assets/workingmantwo.png";
import AppStore from "../../assets/Appstore_button.png";
import PlayStore from "../../assets/Google-play-badge-1.png";
import HomePFP from "../../assets/homepagepfp.png";
import StijnPFP from "../../assets/stijn.png";
import { Link } from "react-router-dom";
import { taal } from "../ui/NavBar/Navigation.tsx";

const PopularCardsData = [
  {
    id: 1,
    name: "Hovenier",
    icon: <YardIcon />,
  },
  {
    id: 2,
    name: "Elektriciën",
    icon: <ElectricBoltIcon />,
  },
  {
    id: 3,
    name: "Loodgieter",
    icon: <PlumbingIcon />,
  },
  {
    id: 4,
    name: "Dakdekker",
    icon: <RoofingIcon />,
  },
  {
    id: 5,
    name: "Schoonmaker",
    icon: <CleaningServicesIcon />,
  },
  {
    id: 1,
    name: "Hovenier",
    icon: <YardIcon />,
  },
  {
    id: 2,
    name: "Elektriciën",
    icon: <ElectricBoltIcon />,
  },
  {
    id: 3,
    name: "Loodgieter",
    icon: <PlumbingIcon />,
  },
  {
    id: 4,
    name: "Dakdekker",
    icon: <RoofingIcon />,
  },
];

function HomePageTwo() {
  const [activeTab, setActiveTab] = useState("homeOwner");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

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
      <article className="InfoBarHome">
        <div className="infoContainerHome">
          <StarIcon />
          <h4 className="infoContainerHomeH4">100+ Vakspecialisten </h4>
        </div>
        <div className="infoContainerHome">
          <StarIcon />
          <h4 className="infoContainerHomeH4">1000+ klussen</h4>
        </div>
        <div className="infoContainerHome">
          <StarIcon />
          <h4 className="infoContainerHomeH4">4.7 uit 5 reviews</h4>
        </div>
        <article className="infoContainerHome">
          <StarIcon />
          <h4 className="infoContainerHomeH4">All-in-1 App</h4>
        </article>
      </article>
      <section className="howItWorksSectionHome">
        <article className="howItWorksTitleContainerHome">
          <h2 className="howItWorksTitleHome">Hoe Mostpros Werkt</h2>
        </article>
        <section className="howItworksContainerCards">
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Beschrijf je klus</h5>
            <p className="howitworkscardhomeP">
              Voer in de zoekbalk je klus in en geef een beschrijving van de
              gewenste werkzaamheden.
            </p>
          </article>
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Vind & huur vakmannen</h5>
            <p className="howitworkscardhomeP">
              Ontvang reacties van vakmannen. Chat rechtstreeks. Bespreek
              details, kosten en de tijdlijn. Vergelijk offertes en huur met
              vertrouwen.
            </p>
          </article>
          <article className="howItWorksCardHome">
            <h5 className="howitworkscardhomeH5">Beheer & betaal vakmannen</h5>
            <p className="howitworkscardhomeP">
              Beheer en betaal veilig de ingehuurde vakman, nadat het gewenste
              resultaat is geleverd.
            </p>
          </article>
        </section>
      </section>
      <section className="whyMostProsSectionHome">
        <img
          src={WhyMostProsImg}
          alt="Werkende vakspecialist bij een klus"
          className="whyMostProsSectionHomeImg"
        />
        <article className="whyMostProsTextContainerHome">
          <h2 className="howItWorksTitleHome">Waarom Mostpros?</h2>
          <p className="howitworkscardhomeP">
            MostPros is een All-in-1 Home Services App. Vind, huur, beheer en
            betaal gecertificeerde lokale vakspecialist als huiseigenaar voor al
            uw klussen. <br /> <br />
            Samen met ons groeiende netwerk bouwen we mee aan de huizen voor de
            toekomst. Samen helpen we mensen groeien. We accepteren de home
            service industrie niet zoals die is, samen willen we het veranderen
            terwijl we plezier hebben.
          </p>
          <article className="whyMostProsButtonContainer">
            <button className="whyMostProsButtonHome">Plaats je klus</button>
            <button className="whyMostProsButtonTwoHome">
              Inschrijven als vakman
            </button>
          </article>
        </article>
      </section>
      <section className="whyMostProsSectionHomeTwo">
        <img
          src={Allin1ServiceImg}
          alt="Werkende vakspecialist bij een klus"
          className="whyMostProsSectionHomeImg "
        />
        <article className="whyMostProsTextContainerHome">
          <h2 className="howItWorksTitleHome">All-in-1 Home Services App</h2>
          <p className="howitworkscardhomeP">
            Bespaar jezelf kosten en administratieve tijd met de All-in-1 Home
            Service App. Mostpros is je klus partner tijdens de levenscyclus van
            je huizenbezit.
            <br /> <br />
            Een gebruiksvriendelijke app met gecertificeerde lokale
            vakspecialisten om elke klus te voltooien.
          </p>
          <article className="whyMostProsButtonContainer">
            <img
              src={AppStore}
              alt="Appstore download"
              className="AppStoreHomeDownload"
            />
            <img
              src={PlayStore}
              alt="PlayStore download"
              className="PlayStoreHomeDownload"
            />
          </article>
        </article>
      </section>
      <section className="homeProfHighlightHomeSection">
        <h2 className="howItWorksTitleHome">Uitgelichte vakspecialisten</h2>
        <p className="howitworkscardhomeP">
          Top vakspecialisten, zoals aannemers, loodgieters en hoveniers,
          verbeteren <br /> de ervaring van huiseigenaren met vakmanschap
        </p>
      </section>
      <section className="HomeProfCardsContainer">
        <section className="HomeProfCardsSectionHome">
          <article className="HomeProCardHome">
            <section className="HomeProCardPFPSection">
              <img
                src={HomePFP}
                alt="Profiel Foto vakspecialist"
                className="HomeProfCardPFP "
              />
              <h5 className="HomeProCardhomeH5">
                Bas Fixo B.V. <br />
                Loodgieter
              </h5>
            </section>
            <section className="HomeProCardReviewSection">
              <article className="HomeProCardStarContainer">
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
              </article>
              <p className="HomeProCardhomeReviewP">5.0/5 (17 reviews)</p>
            </section>
            <p className="HomeProCardhomeReviewText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <section className="HomeProCardhomeButtonContainer">
              <button className="HomeProCardhomeViewProfileButton">
                Bekijk Profiel
              </button>
            </section>
          </article>
          <article className="HomeProCardHome">
            <section className="HomeProCardPFPSection">
              <img
                src={HomePFP}
                alt="Profiel Foto vakspecialist"
                className="HomeProfCardPFP "
              />
              <h5 className="HomeProCardhomeH5">
                Bas Fixo B.V. <br />
                Loodgieter
              </h5>
            </section>
            <section className="HomeProCardReviewSection">
              <article className="HomeProCardStarContainer">
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
              </article>
              <p className="HomeProCardhomeReviewP">5.0/5 (17 reviews)</p>
            </section>
            <p className="HomeProCardhomeReviewText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <section className="HomeProCardhomeButtonContainer">
              <button className="HomeProCardhomeViewProfileButton">
                Bekijk Profiel
              </button>
            </section>
          </article>
          <article className="HomeProCardHome">
            <section className="HomeProCardPFPSection">
              <img
                src={HomePFP}
                alt="Profiel Foto vakspecialist"
                className="HomeProfCardPFP "
              />
              <h5 className="HomeProCardhomeH5">
                Bas Fixo B.V. <br />
                Loodgieter
              </h5>
            </section>
            <section className="HomeProCardReviewSection">
              <article className="HomeProCardStarContainer">
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
              </article>
              <p className="HomeProCardhomeReviewP">5.0/5 (17 reviews)</p>
            </section>
            <p className="HomeProCardhomeReviewText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <section className="HomeProCardhomeButtonContainer">
              <button className="HomeProCardhomeViewProfileButton">
                Bekijk Profiel
              </button>
            </section>
          </article>
          <article className="HomeProCardHome">
            <section className="HomeProCardPFPSection">
              <img
                src={HomePFP}
                alt="Profiel Foto vakspecialist"
                className="HomeProfCardPFP "
              />
              <h5 className="HomeProCardhomeH5">
                Bas Fixo B.V. <br />
                Loodgieter
              </h5>
            </section>
            <section className="HomeProCardReviewSection">
              <article className="HomeProCardStarContainer">
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
              </article>
              <p className="HomeProCardhomeReviewP">5.0/5 (17 reviews)</p>
            </section>
            <p className="HomeProCardhomeReviewText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <section className="HomeProCardhomeButtonContainer">
              <button className="HomeProCardhomeViewProfileButton">
                Bekijk Profiel
              </button>
            </section>
          </article>
          <article className="HomeProCardHome">
            <section className="HomeProCardPFPSection">
              <img
                src={HomePFP}
                alt="Profiel Foto vakspecialist"
                className="HomeProfCardPFP "
              />
              <h5 className="HomeProCardhomeH5">
                Bas Fixo B.V. <br />
                Loodgieter
              </h5>
            </section>
            <section className="HomeProCardReviewSection">
              <article className="HomeProCardStarContainer">
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
              </article>
              <p className="HomeProCardhomeReviewP">5.0/5 (17 reviews)</p>
            </section>
            <p className="HomeProCardhomeReviewText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <section className="HomeProCardhomeButtonContainer">
              <button className="HomeProCardhomeViewProfileButton">
                Bekijk Profiel
              </button>
            </section>
          </article>
          <article className="HomeProCardHome">
            <section className="HomeProCardPFPSection">
              <img
                src={HomePFP}
                alt="Profiel Foto vakspecialist"
                className="HomeProfCardPFP "
              />
              <h5 className="HomeProCardhomeH5">
                Bas Fixo B.V. <br />
                Loodgieter
              </h5>
            </section>
            <section className="HomeProCardReviewSection">
              <article className="HomeProCardStarContainer">
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
                <StarIcon style={{ fontSize: "2rem" }} />
              </article>
              <p className="HomeProCardhomeReviewP">5.0/5 (17 reviews)</p>
            </section>
            <p className="HomeProCardhomeReviewText">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <section className="HomeProCardhomeButtonContainer">
              <button className="HomeProCardhomeViewProfileButton">
                Bekijk Profiel
              </button>
            </section>
          </article>
        </section>
      </section>
      <section className="HomeProfReviewSectionHome">
        <article className="HomeProfReviewTitlesContainer">
          <h2 className="howItWorksTitleHome">Reviews</h2>
          <section className="HomeProfReviewWrapper">
            <h5
              className={
                activeTab === "homeOwner"
                  ? "HomeProReviewH5HomeOwner active"
                  : "HomeProReviewH5HomeOwner"
              }
              onClick={() => handleClick("homeOwner")}
            >
              Huiseigenaar
            </h5>
            <h5
              className={
                activeTab === "professional"
                  ? "HomeProReviewH5Proffesional active"
                  : "HomeProReviewH5Proffesional"
              }
              onClick={() => handleClick("professional")}
            >
              Vakspecialist
            </h5>
          </section>
        </article>
        <article className="HomeProfReviewHomeContainer">
          <article className="ReviewCardHomeProfHome">
            <img
              src={StijnPFP}
              alt="Profiel Foto"
              className="HomeProfCardPFP"
            />
            <div>
              <section className="HomeProfCardInfoContainer">
                <h5 className="HomeProCardhomeH5">Stijn Barneveld</h5>
                <article className="HomeProCardStarContainer">
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                </article>
              </section>
              <section className="HomeProfCardInfoContainer">
                <p className="HomeProCardhomeInfoReviewText">
                “Fijn om weer gebruik te mogen maken van je diensten als loodgieter. Ik zou je zeker aanbevelen aan mijn buren in de straat.  
                </p>
              </section>
            </div>
          </article>
          <div className="dividerDivLine"></div>
          <article className="ReviewCardHomeProfHome">
            <img
              src={StijnPFP}
              alt="Profiel Foto"
              className="HomeProfCardPFP"
            />
            <div>
              <section className="HomeProfCardInfoContainer">
                <h5 className="HomeProCardhomeH5">Stijn Barneveld</h5>
                <article className="HomeProCardStarContainer">
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                  <StarIcon style={{ fontSize: "2rem" }} />
                </article>
              </section>
              <section className="HomeProfCardInfoContainer">
                <p className="HomeProCardhomeInfoReviewText">
                “Fijn om weer gebruik te mogen maken van je diensten als loodgieter. Ik zou je zeker aanbevelen aan mijn buren in de straat.  
                </p>
              </section>
            </div>
          </article>
        </article>
      </section>
    </main>
  );
}

export default HomePageTwo;
