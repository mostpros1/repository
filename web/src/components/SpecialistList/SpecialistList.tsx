import "./SpecialistList.css";
import SpecialistCard from "./SpecialistCard";

function SpecialistList() {
  return (
    <>
      <strong>Aanbevolen vakspecialisten</strong>
      <div className="specialist_card_con">
        <SpecialistCard />
      </div>
    </>
  );
}

export default SpecialistList;