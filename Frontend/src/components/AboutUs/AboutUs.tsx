import "./AboutUs.css"
import TeamDrawing from "../../assets/Team_draw.png";
import AboutText from "../../assets/About_text.png"

function AboutUs() {
    return (
        <div className="about_us">
            <div className="about_con">
                <div className="about_left_con">
                    <div className="about_text_con">
                        <h2>Over ons</h2>
                        <div className="about_p">
                            <p>Mostpros is een community marktplaats voor huiseigenaren om een moderne lokale vakspecialist te vinden. Samen met ons groeiende netwerk bouwen we mee aan de huizen voor de toekomst.</p>
                            <p>Samen helpen we mensen groeien. We accepteren de home service industrie niet zoals die is, samen willen we het veranderen terwijl we plezier hebben.</p>
                        </div>
                    </div>
                    <div className="about_text">
                        <img src={AboutText} alt="" />
                    </div>

                </div>
                <div className="about_img_con">
                    <img src={TeamDrawing} alt="" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs