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

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget || e.relatedTarget.className !== 'search_dropdown_item') {
      setShowList(false);
    }
  };

  const handleInputFocus = () => {
    setShowList(true);
  };

  const searchResults = () => {
    const searchTerm = value.toLowerCase().trim();
  
    // Search for matches in individual tasks and specialist names
    const taskResults = specialists.flatMap((specialist) => {
      const tasks = specialist.tasks
        .filter((task) => task.task.toLowerCase().includes(searchTerm))
        .map((task) => ({
          specialistName: specialist.name.toLowerCase(),
          task: task.task,
          link: task.link,
        }));
  
      return tasks.length >  0 ? tasks : [];
    });
  
    const specialistResults = specialists
      .filter((specialist) => specialist.name.toLowerCase().includes(searchTerm))
      .map((specialist: Specialist) => ({
        specialistName: specialist.name.toLowerCase(),
        task: '', // Assuming a task field is required, you might want to adjust this
        link: specialist.link || '', // Assuming a link field is required, you might want to adjust this
      }));
  
    return [...taskResults, ...specialistResults];
  };
  const slicedResults = searchResults().slice(0, 5); // Beperk tot de eerste 5 resultaten

  const resultsRender = slicedResults.map((result, index) => (
    <Link
      to={`/klussen${result.link}`}
      key={index}
      className="search_dropdown_item"
    >
      {`${result.specialistName ? `${result.specialistName} - ` : ''}${result.task}`}
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
