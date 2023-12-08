import "./DashboardTaskButton.css"
import AddBtn from "../../../assets/Vector.png"
import { Link, useLocation } from "react-router-dom"


function DashboardTaskButton() {

  const location = useLocation();

  const { pathname } = location;

  let renderTaskButton;

  switch (pathname) {
    case '/huiseigenaar-klussen':
      renderTaskButton =
        <Link to="/klussen">
          <img src={AddBtn} alt="" />
          <p>Nieuwe klus toevoegen</p>
        </Link>;
      break
      
    default:
      renderTaskButton =
        <Link to="/specialist-resultaat">
          <img src={AddBtn} alt="" />
          <p>Nieuwe klus zoeken</p>
        </Link>
  }


  return (
    <div className='NTB_con'>
      {renderTaskButton}
    </div>
  )
}

export default DashboardTaskButton