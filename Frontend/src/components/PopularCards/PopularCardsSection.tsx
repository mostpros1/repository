import PopularCards from "./PopularCards"
import "./PopularCardsSection.css"

function PopularCardsSection() {
  return (
    <div className="popular-section">
      <div className="popular-container">
        <div className="title_container">
          <h2>Populaire klussen</h2>
        </div>

        <PopularCards />
      </div>

    </div>
  )
}

export default PopularCardsSection