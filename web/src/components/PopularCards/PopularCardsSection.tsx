import PopularCards from "./PopularCards"
import "./PopularCardsSection.css"

function PopularCardsSection() {
  return (
    <article className="popular-section">
      <section className="title_container">
        <h2>Populaire klussen</h2>
      </section>
      <section className="popular-container">
        <PopularCards />
      </section>

    </article>
  )
}

export default PopularCardsSection