import "./PADHero.css";
import PADavatar from "../../assets/PAD-avatar.jpg";
function PADHero() {
  return (
    <>
      <div className="PADHero_container">
        <div className="PADHero_left">
          <h2>Disclaimer</h2>
        </div>
        <div className="PADHero_right">
          <img src={PADavatar} alt="PADavatar" className="PADAvatar" />
        </div>
      </div>
    </>
  );
}

export default PADHero;
