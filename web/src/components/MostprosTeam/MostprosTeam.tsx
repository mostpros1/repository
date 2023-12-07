import "./MostprosTeam.css"
import TeamMostpros from "../../assets/TeamMostpros.png"

function MostprosTeam() {
  return (
    <div className="MostprosTeam">
        <div className="MostprosTeam_con">
            <div className="team_img">
                <h2>Het team</h2>
                <img src={TeamMostpros} alt="" />
            </div>
            <div className="team_text">
                <p>Onze team bestaat uit een creatieve jonge groep van Designers en Developers. Op de foto van links naar rechts: Jarreau Gill, Jelani Alexis, Robin Hu, Stefan Hopman, Tim Hart, Timo Schuurman, Hisjaam, Max en Mohamed alhafez.</p>
            </div>
        </div>
    </div>
  )
}

export default MostprosTeam