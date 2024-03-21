import './SearchBar.css';
import specialists from '../../../data/specialists.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// ...

interface Specialist {
  id: number;
  name: string;
  tasks: { task: string; link: string }[];
  link?: string;
}

function Searchbar() {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);

  const handleInputBlur = (e) => {
    if (!e.relatedTarget || e.relatedTarget.className !== 'search_dropdown_item') {
      setShowList(false);
    }
  };

  const handleInputFocus = () => {
    setShowList(true);
  };
  const handleResultClick = (link: string) => {
    navigate(`/klussen#${link}`);
  };


  const handleInputKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case "ArrowDown":
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, slicedResults.length - 1)
        );
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < slicedResults.length) {
          const selectedResult = slicedResults[selectedIndex];
          handleResultClick(selectedResult.link);
        }
        break;
      case "Tab": // Implementing autocomplete on Tab key
        if (slicedResults.length > 0) {
          const selectedResult = slicedResults[0];
          setValue(selectedResult.task); // Autocomplete with the first suggestion
          setSelectedIndex(0);
        }
        break;
      default:
        break;
    }
  };

  
  const searchResults = () => {
    const searchTerm = value.toLowerCase().trim();

    // Zoek overal naar overeenkomsten in de individuele taken en specialistnamen
    const taskResults = specialists.flatMap((specialist) => {
      const tasks = specialist.tasks
        .filter((task) => task.task.toLowerCase().includes(searchTerm))
        .map((task) => ({
          specialistName: specialist.name.toLowerCase(),
          task: task.task,
          link: task.link,
        }));

      return tasks.length > 0 ? tasks : [];
    });

    const specialistResults = specialists
      .filter((specialist) => specialist.name.toLowerCase().includes(searchTerm))
      .flatMap((specialist: Specialist) => {
        return specialist.tasks.map((task) => ({
          specialistName: specialist.name.toLowerCase(),
          task: task.task,
          link: task.link,
        }));
      });

    return [...taskResults, ...specialistResults];
  };

  const slicedResults = searchResults().slice(0, 5); // Beperk tot de eerste 5 resultaten

  const resultsRender = slicedResults.map((result, index) => (
    <Link
      to={`/klussen#${result.specialistName.replace('/', '')}?${result.link.replace('/', '')}`}
      key={index}
      className={`search_dropdown_item ${
        index === selectedIndex ? "selected" : ""
      }`}
      onClick={() => handleResultClick(result.specialistName.replace('/', '') + result.link.replace('/', ''))}
      onMouseOver={() => setSelectedIndex(index)}
    >
      <span>
        {result.specialistName ? `${result.specialistName} - ` : ""}
        {result.task}
      </span>
    </Link>
  ));

  return (
    <>
      <div className={showList ? "search-container_open" : "search-container"}>
        <label>Wat is je klus?</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Bijvoorbeeld: loodgieter"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className={showList ? "search_dropdown open" : "search_dropdown"}>
          {resultsRender}
        </div>
      </div>
    </>
  );
}

// ...

export default Searchbar;
