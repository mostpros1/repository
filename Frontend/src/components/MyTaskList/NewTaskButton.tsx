import "./NewTaskButton.css"
import AddBtn from "../../assets/Vector.png"
import { Link } from "react-router-dom"

function NewTaskButton() {
  return (
    <div className='NTB_con'>
      <Link to="/specialist-resultaat">
        <img src={AddBtn} alt="" />
        <p>Nieuwe klus zoeken</p>
      </Link>     
    </div>
  )
}

export default NewTaskButton