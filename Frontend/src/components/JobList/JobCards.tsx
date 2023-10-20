import "./JobCards.css"
import gasleiding from "../../assets/Gasleiding.svg"

function JobCards() {

    let joblisting = [
        {
            id: 1,
            name: "Mark",
            distance: 1.1,
            img: gasleiding,
            title: "gas lekkage",
            location: "Amsterdam",
            availability: "4 dagen"
        },
        {
            id: 2,
            name: "Mark",
            distance: 1.1,
            img: gasleiding,
            title: "gas lekkage",
            location: "Amsterdam",
            availability: "4 dagen"
        },
        {
            id: 3,
            name: "Mark",
            distance: 1.1,
            img: gasleiding,
            title: "gas lekkage",
            location: "Amsterdam",
            availability: "4 dagen"
        },
        {
            id: 4,
            name: "Mark",
            distance: 1.1,
            img: gasleiding,
            title: "gas lekkage",
            location: "Amsterdam",
            availability: "4 dagen"
        },
    ]

    let jobCardsRender = joblisting.map((job) => {
        return (
            <div key={job.id}>
                <div>
                    <h2>{job.name}</h2>
                    <p>{job.distance}</p>
                </div>
                <div className="job-img-con">
                    <img src={job.img} alt="" />
                </div>
                <h2 className="job-title">{job.title}</h2>
                <div className="job-info">
                    <p>Locatie: {job.location}</p>
                    <p>Binnen {job.availability}</p>
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