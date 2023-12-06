import "./FirstSpecialistQ.css"

function FirstSpecialistQ() {
  return (
    <div className="specialist_q_wrapper">
        <p>In welke omgeving wilt u werken</p>
        <div className="specialist_q_con">
            <div className="specialist_q">
                <label>Amsterdam</label>
                <input type="radio" value="hello" />
            </div>
            <div className="specialist_q">
                <label>Den Haag</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Rotterdam</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Groningen</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Utrecht</label>
                <input type="radio" value="hello" />
            </div>  
            <div className="specialist_q">
                <label>Eindhoven</label>
                <input type="radio" value="hello" />
            </div>           
        </div>
    </div>
  )
}

export default FirstSpecialistQ