import "./NoKvK.css";
import KvKRedirect from "../../../assets/KvKredirect.png"
function NoKvK() {
  return (
    <div className="NoKvK_con">
      <div className="NoKvK_img_con">
        <img src={KvKRedirect} alt="" />
      </div>
      <div>
        <p>
          Helaas, als je geen KVK-nummer hebt, kun je geen account aanmaken. We
          verzoeken je vriendelijk om een KVK-nummer aan te vragen en op een
          later moment opnieuw te proberen om een account aan te maken.
        </p>
      </div>
    </div>
  );
}

export default NoKvK;
