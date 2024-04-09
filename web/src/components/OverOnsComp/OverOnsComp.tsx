import "./OverOnsComp.css";
import Banner from "../../assets/workbanner.png";
import groepsFoto from "../../assets/groepsFoto.jpg";

function OverOnsComp() {
  return (
    <main id="main">
      <section id="mainTwo">
        <article id="textWrapper">
          <h5 id="smallTitle">MostPros</h5>
          <h2 id="bigTitle">
            Mostpros is een community marktplaats voor huiseigenaren om een
            moderne lokale vakspecialist te vinden.
          </h2>
        </article>
        <div id="contentContainer">
          <article id="textImageWrapper">
            <p id="aboutusText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
              esse. Doloremque a tempore iure cumque. Ipsam error impedit autem a
              iure nemo nam in ea id consequatur, quo, odio eveniet.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
              esse. Doloremque a tempore iure cumque. Ipsam error impedit autem a
              iure nemo nam in ea id consequatur, quo, odio eveniet.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
              esse. Doloremque a tempore iure cumque.
            </p>
            <p id="aboutusText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
              esse. Doloremque a tempore iure cumque. Ipsam error impedit autem a
              iure nemo nam in ea id consequatur, quo, odio eveniet.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
              esse. Doloremque a tempore iure cumque. Ipsam error impedit autem a
              iure nemo nam in ea id consequatur, quo, odio eveniet.
            </p>
          </article>
          <img src={groepsFoto} alt="groeps foto van de medewerkers Mostpros" id="groupImage" />
        </div>
      </section>
    </main>
  );
}

export default OverOnsComp;
