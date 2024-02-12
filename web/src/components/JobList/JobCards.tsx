import "./JobCards.css";
import gasleiding from "../../assets/Gasleiding.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function JobCards() {
  let joblisting = [
    {
      id: 1,
      name: "Mark",
      distance: 6,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },
    {
      id: 2,
      name: "Mark",
      distance: 6,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 3,
      name: "Mark",
      distance: 5,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 4,
      name: "Mark",
      distance: 4,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 5,
      name: "Mark",
      distance: 7,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 6,
      name: "Mark",
      distance: 2,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 7,
      name: "Mark",
      distance: 8,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 8,
      name: "Mark",
      distance: 5,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 9,
      name: "Mark",
      distance: 2,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },
    {
      id: 10,
      name: "Mark",
      distance: 3,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 11,
      name: "Mark",
      distance: 5,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 12,
      name: "Mark",
      distance: 8,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
  ];

  let jobCardsRender = joblisting.map((job) => {
    return (
        <div key={job.id} className="taskCard">
            <div className="user-detail">
                <h2>{job.name}</h2>
                <p><LocationOnIcon/>{job.distance}KM</p>
            </div>
            <div className="job-info">
                <h2 className="job-title">{job.title}</h2>
                <p className="job-desc">{job.description}</p>
            </div>
            <div className="jobInfo-extra-con">
                <div className="jobInfo-extra">
                    <LocationOnIcon/>
                    <p>Locatie: {job.location}</p>
                </div>
                <div className="jobInfo-extra">
                    <CalendarMonthIcon/>
                    <p>Binnen {job.availability}</p>
                </div>             
            </div>
            <a className="mail_btn" href="mailto:teammostpros@gmail.com">Contact opnemen</a >
        </div>
    )
})

return (
<>
    {jobCardsRender}
</> 
)
}

export default JobCards