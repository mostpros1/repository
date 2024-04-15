import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "./ConfirmDateComp.css";

function ConfirmDateComp() {
  const initialDate = 4; // Initial date value
  const [showIcons, setShowIcons] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const [centerDateCard, setCenterDateCard] = useState(false);
  const [showWijzigButton, setShowWijzigButton] = useState(true);
  const [date, setDate] = useState(initialDate);
  const [disableRightCircle, setDisableRightCircle] = useState(false);
  const [disableLeftCircle, setDisableLeftCircle] = useState(false);
  const [buttonText, setButtonText] = useState("Datum Bevestigen");
  const [buttonColor, setButtonColor] = useState("#308AE4");
  const [buttonClicked, setButtonClicked] = useState<"left" | "right" | null>(null); // Updated type

  const handleDatumWijzigenClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setShowIcons(false);
    setShowArrows(true);
    setCenterDateCard(true);
    setShowWijzigButton(false);
    setButtonText("Wijzigingen Opslaan");
    setButtonColor("gray");
  };

  const handleRightArrowClick = () => {
    if (date < 31) {
      setDate(date + 1);
      if (date + 1 === 31) {
        setDisableRightCircle(true);
      }
    }
    setDisableLeftCircle(false); // Reset left arrow color
    setButtonColor("#308AE4");
    setButtonClicked("right"); // Update button clicked state with direction
    setTimeout(() => setButtonClicked(null), 300); // Reset button clicked state after 300ms
  };

  const handleLeftArrowClick = () => {
    if (date > 1) {
      setDate(date - 1);
      if (date - 1 === 1) {
        setDisableLeftCircle(true);
      }
    }
    setDisableRightCircle(false); // Reset right arrow color
    setButtonColor("#308AE4");
    setButtonClicked("left"); // Update button clicked state with direction
    setTimeout(() => setButtonClicked(null), 300); // Reset button clicked state after 300ms
  };

  const handleWijzigingenOpslaanClick = () => {
    // Resetting the component state to its initial values
    setShowIcons(true);
    setShowArrows(false);
    setCenterDateCard(false);
    setShowWijzigButton(true);
    setButtonText("Datum Bevestigen");
    setButtonColor("#308AE4");
    // You can save the changed date value here, if needed
  };

  return (
    <main id="mainConfirmDate">
      <section id="topButtonContainerConfirmDate">
        <a
          className="topButtonDetailJobDetailJob"
          href=""
          rel="noopener noreferrer"
        >
          Terug naar klussen
        </a>
      </section>
      <section className="whiteCardDetailJob">
        <article className="cardTitleWrapperDetailJob">
          <h4>Details van de klus</h4>
        </article>
        <p id="infoCardConfirmDate">
          Lisa Zoetlief heeft op 30 September de volgende datum in uw kalender
          gereserveerd: 4 Oktober 2023. Indien deze datum niet mogelijk is
          wijzig deze hier beneden.
        </p>
        <article
          className={`whiteCardRightWrapperDetailJob ${
            centerDateCard ? "centered" : ""
          }`}
        >
          <article className="cardTitleWrapperDetailJob">
            <h4>Datum uitvoering</h4>
          </article>
          <div
            className={`dateCardDetailJob ${centerDateCard ? "centered" : ""}`}
          >
            <div className="arrowContainer" onClick={handleLeftArrowClick}>
              {showArrows && (
                <div className={`circleRed ${disableLeftCircle ? "grayCircle" : ""} ${buttonClicked === "left" ? "animate" : ""}`}>
                  <span className="left-arrow"></span>
                </div>
              )}
            </div>
            <h3 className="dateDayDetailJob">{date}</h3>
            <p className="dateDetailDetailJob">Oktober</p>
            <p className="dateDetailDetailJob">2023</p>
            <div
              className={`arrowContainer ${disableRightCircle ? "disabledCircle" : ""}`}
              onClick={handleRightArrowClick}
            >
              {showArrows && (
                <div className={`circleBlue ${disableRightCircle ? "grayCircle" : ""} ${buttonClicked === "right" ? "animate" : ""}`}>
                  <span className="right-arrow"></span>
                </div>
              )}
            </div>
          </div>

          {showIcons && (
            <article className="iconInfoBoxDetailJob">
              <div className="divFlexDetailJob">
                <EmailIcon style={{ fontSize: "2.4rem", color: "#308AE4" }} />
                <p className="dateDetailDetailJob">Adres: iets straat 23</p>
              </div>
              <div className="divFlexDetailJob">
                <HouseIcon style={{ fontSize: "2.5rem", color: "#308AE4" }} />
                <p className="dateDetailDetailJob">Postcode: 1320 DP</p>
              </div>
              <div className="divFlexDetailJob">
                <LocationOnIcon
                  style={{ fontSize: "2.5rem", color: "#308AE4" }}
                />
                <p className="dateDetailDetailJob">Locatie: Haarlem</p>
              </div>
            </article>
          )}
          {showWijzigButton && (
            <div className="moreInfoBoxDetailJob">
              <a
                href=""
                rel="noopener noreferrer"
                className="noDecorationDetailJob"
                onClick={handleDatumWijzigenClick}
              >
                <p className="moreInfoNameDetailJob" style={{ color: buttonColor }}>Wijzig datum</p>
              </a>
            </div>
          )}
        </article>
        <div className="buttonContainerConfirmDate">
          <button
            id="buttonConfirmDate"
            style={{ background: buttonColor }}
            onClick={handleWijzigingenOpslaanClick}
          >
            {buttonText}
          </button>
        </div>
      </section>
    </main>
  );
}

export default ConfirmDateComp;
