import "./SpecialistCard.css";
import star from "../../assets/icon _star 1_.png";
import emptyStar from "../../assets/icon _star 1_empty.png";
import person from '../../../../App/app/assets/JanSchilder.jpg'

function SpecialistCard() {
  let specialistsData = [
    {
      id: 1,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      desc: "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
    {
      id: 2,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      desc: "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
    {
      id: 3,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      desc: "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
    {
      id: 4,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      desc: "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
  ];

  let specialistCardRender = specialistsData.map((specialist) => {
    return (
      <div key={specialist.id} className="specialist_card">
        <div className="specialist_card_detail">
          <div className="specialist_card_img_con">
            <img src={specialist.img} alt={specialist.name} />
          </div>
          <div className="specialist_personal_detail">
            <p className="specialist_card_name">{specialist.name}</p>
            <p className="specialist_card_job">{specialist.job}</p>
          </div>
        </div>
        <div className="extra_specialist_details">
          <div className="specialist_rating">
            <img className="review_star" src={star} alt="" />
            <img className="review_star" src={star} alt="" />
            <img className="review_star" src={star} alt="" />
            <img className="review_star" src={star} alt="" />
            <img className="review_star" src={emptyStar} alt="" />
          </div>
          <p>{specialist.price}</p>
        </div>
        <p className="specialist_card_desc">{specialist.desc}</p>
        <a className="mail_btn" href="mailto:teammostpros@gmail.com">Contact opnemen</a>
      </div>
    );
  });

  return <>{specialistCardRender}</>;
}

export default SpecialistCard;
