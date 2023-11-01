import "./HowItWorks.css"
import HomeButton from "../ui/HomeButton/HomeButton"
import StepsImg from "../../assets/hoe-werkt-het.png"

function HowItWorks() {
  return (
    <div className="HowItsWorks">
        <div className="HowItsWorks_con">
            <HomeButton/>
            <div className="steps_img_con">
                <img src={StepsImg} alt="" />
            </div>
        </div>
    </div>
  )
}

export default HowItWorks