import "./FilterBar.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FilterBar() {
  return (
    <div className="filterbar">
      <div className="filter-con">
        <div className="filter_menu_items">
          <div className="filter_items_con">
            <p>Locatie</p>
            <div className="sort_text_con">
              <p>Haarlem</p>
              <ExpandMoreIcon />
              <ul className="filter_items">
                <li>Amsterdam</li>
                <li>Rotterdam</li>
              </ul>
            </div>
          </div>
          <div className="filter_items_con">
            <p>Sorteren</p>
            <div className="sort_text_con">
              <p>Van laag naar hoog</p>
              <ExpandMoreIcon />
              <ul className="filter_items">
                <li>Amsterdam</li>
                <li>Rotterdam</li>
              </ul>
            </div>
          </div>
          <div className="filter_items_con">
            <p>Prijs vanaf</p>
            <div className="sort_text_con">
              <p>€500</p>
              <ExpandMoreIcon />
              <ul className="filter_items">
                <li>Amsterdam</li>
                <li>Rotterdam</li>
              </ul>
            </div>
          </div>
        </div>
        <button className="filter_search_btn">Zoeken</button>
      </div>
    </div>
  );
}

export default FilterBar;
