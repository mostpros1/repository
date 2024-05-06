import "./SpecialistCard.css";
import star from "../../assets/icon _star 1_.png";
import emptyStar from "../../assets/icon _star 1_empty.png";
import person from "../../assets/JanSchilder.jpg";
import { useState, useEffect } from "react";

import { dynamo } from "../../../declarations.ts";


function SpecialistCard() {

  const [specialists, setSpecialists] = useState<any[]>([]);


  let specialistsData = [
    {
      id: 1,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      email: "test@test.nl",
      desc:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
    {
      id: 2,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      email: "test@test.nl",
      desc:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
    {
      id: 3,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      email: "test@test.nl",
      desc:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
    {
      id: 4,
      name: "Jan Schilder",
      img: person,
      job: "Loodgieter",
      email: "test@test.nl",
      desc:
        "Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.",
      price: "€500",
    },
  ];

  const handleChatButtonClick = (email: string) => {
    const currentPath = "/chat";
    const recipientQuery = `recipient=${email}`;
    const newUrl = `${currentPath}?${recipientQuery}`;
    window.location.href = newUrl;
  };

  useEffect(() => {
    let professionals: any[] = [];

    const profession = window.location.hash.replace("#", "").split("?")[0];

    const task = window.location.hash.replace("#", "").split("?")[1].split("!")[0];

    const url = window.location.href;
    const date = url.replace("?", "").split("!")[1];
    console.log(date);


    dynamo.query({
      TableName: "Professionals",
      IndexName: "profession",
      KeyConditionExpression: "profession = :profession",
      FilterExpression: "task = :task",
      ExpressionAttributeValues: {
        ":profession": profession,
        ":task": task,
      },
    }).promise()
      .then(data => {

        const convertedItems = data.Items?.map(item => ({
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          profession: item.profession,
          price: item.price,
          rating: item.rating,
          bio: item.bio,
          availibility: item.availibility,


        }));
        /*
                const Availability = JSON.parse(convertedItems[0].availibility);
                '{"dates":["2024-03-31","2024-04-01","2024-04-02"]}'
                console.log("Availability =", Availability);
        */
        console.log("task =", task);
        console.log("convertedItems =", convertedItems);
        if (convertedItems) {
          for (let i: number = 0; i < convertedItems.length; i++) {
            if (convertedItems[i].availibility) {
        
              for (let a = 0; a < convertedItems.length; a++) {
  
                if (date == convertedItems[i].availibility[a]) {
                  professionals = [...professionals, convertedItems[i]];
                  console.log(professionals);
                  break;
                }
              }

              
            }
          }
          setSpecialists(/*convertedItems*/professionals);
        }
      }).catch(err => {
        console.log(err);
      });

  }, []);

  let specialistCardRender = specialists?.map((specialist) => {
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
        <button className='main_btn' onClick={() => handleChatButtonClick(specialist.email)}>Contact opnemen</button>
      </div>
    );
  }) || null;

  return <>{specialistCardRender}</>;
}

export default SpecialistCard;
