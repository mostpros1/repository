import "./NewTaskButton.css"
import AddBtn from "../../assets/Vector.png"

function NewTaskButton() {
  return (
    <div className='NTB_con'>
      <div>
        <img src={AddBtn} alt="" />
      </div>
      <p>Nieuwe klus zoeken</p>
    </div>
  )
}

export default NewTaskButton