import "./ProfessionalDashboardLeftside.css"
import { useUser } from "../../../context/UserContext";
import EmailIcon from '@mui/icons-material/Email';
import JoinChat from "../../Chat/JoinChat";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Bas from "../../../assets/Bas_R.png"

function ProfessionalDashboardLeftside() {
    const { user } = useUser();

    let userInfo =
      <>
        <p>professional</p>
      </>;
  
    if (user) {
      userInfo = (
        <> 
          <p className="prof_email"><EmailIcon/> {user.attributes.email}</p>
          <p className="prof_phone"><ContactPhoneIcon/> {user.attributes.phone_number}</p>
        </>
      );
    }
  
    return (
      <div className="prof_dashboard_con_left">
        <div className="prof_dashboard_info_con">
          <div className="prof_profile_pic">
            <div className="profile_pic"><img src={Bas} alt="bas" /></div>
            {/* <p>{user.attributes.name} {user.attributes.family_name}</p> */}
          </div>
          <div className="prof_info">
            {userInfo}
          </div>
        </div>
        <div className="dashboard_btn_con">
          <JoinChat/>
        </div>
      </div>
    )
}


export default ProfessionalDashboardLeftside