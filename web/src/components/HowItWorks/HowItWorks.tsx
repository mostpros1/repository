import "./HowItWorks.css"
import { Link } from "react-router-dom"
import StepsImg from "../../assets/hoe-werkt-het.png"

function HowItWorks() {
  return (
    <div className="HowItsWorks">
        <div className="HowItsWorks_con">
            <Link to="/">
                <button className="back_to_home">Terug naar start</button>
            </Link>
            <div className="steps_img_con">
                <img src={StepsImg} alt="" />
            </div>
        </div>
    </div>
  )
}

export default HowItWorks