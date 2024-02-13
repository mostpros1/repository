import "./HomeOwnerDashboardLeftside.css"
import { useUser } from "../../../context/UserContext";
import EmailIcon from '@mui/icons-material/Email';
import JoinChat from "../../Chat/JoinChat";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Bas from "../../../assets/Bas_R.png"

function HomeOwnerDashboardLeftside() {

  const { user } = useUser();

  const groups = user.signInUserSession.accessToken.payload['cognito:groups'];

  let userInfo =
    <>
      <p>error</p>
    </>;

  if (user) {
    userInfo = (
      <> 
        <p>{groups}</p>
        <p className="HO_email"><EmailIcon/> {user.attributes.email}</p>
        <p className="HO_phone"><ContactPhoneIcon/> {user.attributes.phone_number}</p>
      </>
    );
  }

  return (
    <div className="HO_dashboard_con_left">
      <div className="dashboard_HO_info_con">
        <div className="HO_profile_pic">
          <div className="profile_pic"><img src={Bas} alt="bas" /></div>
          <p>{user.attributes.name} {user.attributes.family_name}</p>
        </div>
        <div className="HO_info">
          {userInfo}
        </div>
      </div>
      <div className="dashboard_btn_con">
        <JoinChat/>
      </div>
    </div>
  )
}

export default HomeOwnerDashboardLeftside