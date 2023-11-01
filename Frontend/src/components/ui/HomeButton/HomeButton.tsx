import { Link } from "react-router-dom"

function HomeButton() {
  return (
    <Link to="/">
      <button className="back_to_home">Terug naar start</button>
    </Link>
  );
}

export default HomeButton;
