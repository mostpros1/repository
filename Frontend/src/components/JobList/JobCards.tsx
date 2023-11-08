import "./JobCards.css"
import gasleiding from "../../assets/Gasleiding.svg"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function JobCards() {

    let joblisting = [
        {
            id: 1,
            name: "Mark",
            distance: 1.1,
            title: "gas lekkage",
            description: "Spreek je ananas uis als ananas of aanaanas?",
            img: gasleiding,
            location: "Amsterdam",
            availability: "4 dagen"
        },
        {
            id: 2,
            name: "Mark",
            distance: 1.1,
            title: "gas lekkage",
            description: "Spreek je ananas uis als ananas of aanaanas?",
            img: gasleiding,
            location: "Amsterdam",
            availability: "4 dagen"
        },
        {
            id: 3,
            name: "Mark",
            distance: 1.1,
            title: "gas lekkage",
            description: "Spreek je ananas uis als ananas of aanaanas?",
            img: gasleiding,
            location: "Amsterdam",
            availability: "4 dagen"
        },
        {
            id: 4,
            name: "Mark",
            distance: 1.1,
            title: "gas lekkage",
            description: "Spreek je ananas uis als ananas of aanaanas?",
            img: gasleiding,
            location: "Amsterdam",
            availability: "4 dagen"
        },
    ]

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
                <button className="job-desc-btn">Meer info</button>
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