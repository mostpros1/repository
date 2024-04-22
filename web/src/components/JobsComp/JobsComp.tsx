import "./JobsComp.css";
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from react-icons library

function JobsComp() {
  return (
    <main className="JobsCompMain">
      <section className="JobsCompSearchWrapper">
        <div className="JobsCompsearchBar">
          <FaSearch className="JobsCompsearchIcon" />
          <input className="JobsCompsearchInput" type="text" placeholder="Klussen zoeken" />
        </div>
      </section>
      <section className="JobsComp">

      </section>
    </main>
  );
}

export default JobsComp;
