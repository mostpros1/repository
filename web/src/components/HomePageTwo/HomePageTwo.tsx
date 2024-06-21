import "./HomePageTwo.css";
import YardIcon from "@mui/icons-material/Yard";
import React, { useState, useEffect } from "react";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import RoofingIcon from "@mui/icons-material/Roofing";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WhyMostProsImg from "../../assets/workingman.png";
import Allin1ServiceImg from "../../assets/workingmantwo.png";
import VerhuisPFP from "../../assets/Sem_M.png";
import AppStore from "../../assets/Appstore_button.png";
import PlayStore from "../../assets/Google-play-badge-1.png";
import HomePFP from "../../assets/homepagepfp.png";
import StijnPFP from "../../assets/stijn.png";
import JanyPFP from "../../assets/JanyPFP.png";
import TuinPFP from "../../assets/TuinPFP.png";
import ElectrozPFP from "../../assets/ElectrozPFP.png";
import AanemerPFP from "../../assets/AanemerPFP.png";
import GijsPFP from "../../assets/GijsPFPpng.png";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { taal } from "../ui/NavBar/Navigation.tsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar/SearchBar";
import specialists from "../../data/specialists.ts";
import OverzichtProf from "../Overzicht/OverzichtProf.tsx";

interface Specialist {
  id: number;
  name: string;
  tasks: { task: string; link: string }[];
  link?: string;
}

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
    id: 6,
    name: "Timmerman",
    icon: <CarpenterIcon />,
  },
  {
    id: 7,
    name: "Zonnepanelen",
    icon: <SolarPowerIcon />,
  },
  {
    id: 8,
    name: "Aannemer",
    icon: <HomeRepairServiceIcon />,
  },
];


function HomePageTwo() {
  const [activeTab, setActiveTab] = useState("homeOwner");
  const [startIndex, setStartIndex] = useState(0);
  const [reviewAnimation, setReviewAnimation] = useState(false);
  const navigate = useNavigate();

  const reviews = {
    homeOwner: [
      {
        rating: 4,
        name: "Lisa S",
        image: TuinPFP,
        text: "“Fijn om weer gebruik te mogen maken van je diensten als loodgieter. Ik zou je zeker aanbevelen aan mijn buren in de straat.",
      },
      {
        rating: 5,
        name: "Stijn B",
        image: StijnPFP,
        text: "“Geweldige service en expertise zorgden ervoor dat mijn renovatie klus snel en kundig is gerealiseerd. Ik beveel deze professionele service ten zeerste aan voor een goede renovatie.",
      },
      {
        rating: 4,
        name: "Jos A",
        image: AanemerPFP,
        text: "“Riolering was verstopt en dit is binnen 2 uur opgelost. Dankjewel Remco van Mezosun.",
      },
      {
        rating: 5,
        name: "Mirlo I",
        image: GijsPFP,
        text: "“Ons dak moest compleet vernieuwd worden. Ik ging online zoeken maar kon geen betrouwbare dakdekker vinden tegen een redelijke prijs-kwaliteit verhouding. Venlo Dakdekker BV” heeft ons goed geholpen. We zijn tevreden met ons nieuwe dak.",
      },
    ],
    professional: [
      {
        rating: 5,
        name: "Leo Bos Verhuisservice BV",
        image: VerhuisPFP,
        text: "“Thea ging verhuizen naar een levensloop bestendige woning. Fijn om haar hiermee te ondersteunen en ik heb fijne communicatie met Thea ervaren. Dankjewel.",
      },
      {
        rating: 4,
        name: "Bas Fixo B.V.",
        image: HomePFP,
        text: "“Jan had twee lekkende waterleidingen en nam hiervoor contact met ons op. We hebben de klus gefixt en het wederzijdse vertrouwen met Jan vonden wij prettig",
      },
      {
        rating: 4,
        name: "Electroz B.V.",
        image: ElectrozPFP,
        text: "“Nieuwe groepenkast geplaatst bij mevrouw Vera S. Lekkere koffie met koekje gekregen en gezellig dame om mee te babbelen.",
      },
      {
        rating: 3,
        name: "Houtlab Gijs",
        image: GijsPFP,
        text: "“Ik kreeg de aanvraag binnen om naast het kunstgras hockeyveldje een tuinhuis te maken. Binnen 1 week heb ik dit kunnen realiseren en alles verliep soepel met de huiseigenaar.",
      },
    ],
  };

  const highligtedpros = {
    professionals: [
      {
        rating: 5,
        name: "Bas Fixo B.V.",
        stats: "5.0/5 (17 reviews)",
        image: HomePFP,
        proffesion: "Loodgieter",
        textone: "Sanitair/ lekkages €65/uur incl. btw",
        texttwo: "Radiator vervangen €69/uur incl. btw",
        textthree: "Cv-montage €78/uur incl. btw",
      },
      {
        rating: 4,
        name: "Jany Cleanur B.V.",
        stats: "4.0/5 (7 reviews)",
        image: JanyPFP,
        proffesion: "Schoonmaakster",
        textone: "Schoonmaak €29/uur incl. btw",
        texttwo: "Opruimen €29/uur incl. btw",
        textthree: "Wassen €29/uur incl. btw",
      },
      {
        rating: 4,
        name: "Green horizons B.V.",
        stats: "4.0/5 (19 reviews)",
        image: TuinPFP,
        proffesion: "Tuinontwerpster",
        textone: "Tuinontwerp €75/uur incl. btw",
        texttwo: "Tuinaanleg €64/uur incl. btw",
        textthree: "Tuinonderhoud €55/uur incl. btw",
      },
      {
        rating: 4,
        name: "Electroz B.V.",
        stats: "4.0/5 (9 reviews)",
        image: ElectrozPFP,
        proffesion: "Electriciën",
        textone: "Groepenkast plaatsen €225+ incl. btw",
        texttwo: "Stopcontact plaatsen €59+ incl. btw",
        textthree: "Verlichting installeren €78+ incl. btw",
      },
      {
        rating: 4,
        name: "Houtlab Gijs",
        stats: "4.0/5 (16 reviews)",
        image: GijsPFP,
        proffesion: "Timmerman",
        textone: "Tuinhuis/blokschuur €53/uur incl. btw",
        texttwo: "Overkapping/pergola €53/uur incl. btw",
        textthree: "Poolhouse/veranda €53/uur incl. btw",
      },
      {
        rating: 4,
        name: "Huizenbouw B.V.",
        stats: "4.0/5 (4 reviews)",
        image: AanemerPFP,
        proffesion: "Aannemer",
        textone: "Dakrenovatie/vervangen op aanvraag",
        texttwo: "Aanbouw plaatsen op aanvraag",
        textthree: "Renovatie huis op aanvraag",
      },
    ],
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProOnboardingClick = () => {
    navigate(`/${taal}/pro-onboarding`);
  };

  const handleClick = (tab) => {
    setReviewAnimation(true);
    setTimeout(() => {
      setActiveTab(tab);
      setStartIndex(0);
      setReviewAnimation(false);
    }, 400);
  };

  const handleLeftClick = () => {
    setReviewAnimation(true);
    setTimeout(() => {
      setStartIndex((prevIndex) =>
        prevIndex === 0 ? reviews[activeTab].length - 2 : prevIndex - 1
      );
      setReviewAnimation(false);
    }, 400);
  };

  const handleRightClick = () => {
    setReviewAnimation(true);
    setTimeout(() => {
      setStartIndex((prevIndex) =>
        prevIndex === reviews[activeTab].length - 2 ? 0 : prevIndex + 1
      );
      setReviewAnimation(false);
    }, 400);
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
            <SearchBar />
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
        <div className="scrollContainer">
          <div className="infoContainerHome">
            <StarIcon />
            <h4 className="infoContainerHomeH4">
              <Link
                className="infoContainerHomeLink"
                to={`/${taal}/pro-overview`}
              >
                100+ Vakspecialisten
              </Link>
            </h4>
          </div>
          <div className="infoContainerHome">
            <StarIcon />
            <h4 className="infoContainerHomeH4">
              <Link
                className="infoContainerHomeLink"
                to={`/${taal}/jobs-overview`}
              >
                1000+ Klussen
              </Link>
            </h4>
          </div>
          <div className="infoContainerHome">
            <StarIcon />
            <h4 className="infoContainerHomeH4">4.7 uit 5 reviews</h4>
          </div>
          <div className="infoContainerHome">
            <StarIcon />
            <h4 className="infoContainerHomeH4">
              <Link className="infoContainerHomeLink" to={`/${taal}/quality`}>
                Kwaliteitsgarantie
              </Link>
            </h4>
          </div>
        </div>
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
            <button
              className="whyMostProsButtonHome"
              onClick={handleScrollToTop}
            >
              Plaats je klus
            </button>
            <button
              className="whyMostProsButtonTwoHome"
              onClick={handleProOnboardingClick}
            >
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
          <div className="HomeProCardContainer">
            {highligtedpros.professionals.map((pro, index) => (
              <article className="HomeProCardHome" key={index}>
                <section className="HomeProCardPFPSection">
                  <img
                    src={pro.image}
                    alt="Profiel Foto vakspecialist"
                    className="HomeProfCardPFP"
                  />
                  <article className="HomeProCardhomeH5">
                    <h5 className="HomeProCardhomeH5">{pro.name}</h5>
                    <h5 className="HomeProCardhomeH5">{pro.proffesion}</h5>
                  </article>
                </section>
                <section className="HomeProCardReviewSection">
                  <article className="HomeProCardStarContainer">
                    {[...Array(pro.rating)].map((_, i) => (
                      <StarIcon key={i} style={{ fontSize: "2rem" }} />
                    ))}
                    {[...Array(5 - pro.rating)].map((_, i) => (
                      <StarBorderIcon key={i} style={{ fontSize: "2rem" }} />
                    ))}
                  </article>
                  <p className="HomeProCardhomeReviewP">{pro.stats}</p>
                </section>
                <article className="HomeProCardhomeReviewText">
                  <p>{pro.textone}</p>
                  <p>{pro.texttwo}</p>
                  <p>{pro.textthree}</p>
                </article>
                <section className="HomeProCardhomeButtonContainer">
                  <button className="HomeProCardhomeViewProfileButton">
                    Bekijk Profiel
                  </button>
                </section>
              </article>
            ))}
          </div>
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
        <div
          className="arrowHome lefthome-arrow"
          onClick={handleLeftClick}
        ></div>
        <article className="HomeProfReviewHomeContainer">
          {reviews[activeTab]
            .slice(startIndex, startIndex + 2)
            .map((review, index) => (
              <React.Fragment key={index}>
                <article
                  className={`ReviewCardHomeProfHome ${
                    reviewAnimation ? "animate-out" : ""
                  }`}
                >
                  <img
                    src={review.image}
                    alt="Profiel Foto"
                    className="HomeProfCardPFP"
                  />
                  <div>
                    <section className="HomeProfCardInfoContainer">
                      <h5 className="HomeProCardhomeH5">{review.name}</h5>
                      <article className="HomeProCardStarContainer">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            style={{ fontSize: "2rem", color: "black" }}
                          />
                        ))}
                        {[...Array(Math.max(5 - review.rating, 0))].map(
                          (_, i) => (
                            <StarBorderIcon
                              key={i}
                              style={{ fontSize: "2rem", color: "black" }}
                            />
                          )
                        )}
                      </article>
                    </section>
                    <section className="HomeProfCardInfoContainer">
                      <p className="HomeProCardhomeInfoReviewText">
                        {review.text}
                      </p>
                    </section>
                  </div>
                </article>
              </React.Fragment>
            ))}
        </article>

        <div
          className="arrowHome righthome-arrow"
          onClick={handleRightClick}
        ></div>
      </section>
      <section className="JoinTheCommunityHomeSection">
        <article className="JointhecomminityContainer">
          <h3 className="JoinTheCommunityH3">Kom bij de community</h3>
          <p className="JoinTheCommunityP">
            MostPros is de All-in-1 Home Services App met een community voor
            huiseigenaren, vakspecialisten en medewerkers.
          </p>
          <article className="CommunityButtonContainerHome">
            <button
              className="whyMostProsButtonHome"
              onClick={handleScrollToTop}
            >
              Plaats je klus
            </button>
            <button
              className="CommunityTwoHome"
              onClick={handleProOnboardingClick}
            >
              Inschrijven als vakman
            </button>
          </article>
          <div className="CommunityCircleUp" onClick={handleScrollToTop}>
            <ArrowUpwardIcon style={{ fontSize: "3rem" }} />
          </div>
        </article>
      </section>
    </main>
  );
}

export default HomePageTwo;