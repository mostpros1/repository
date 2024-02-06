import "./SearchBar.css";
import specialists from "../../../data/specialists.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ...

interface Specialist {
  id: number;
  name: string;
  tasks: { task: string; link: string }[];
  link?: string;
}

function Searchbar() {
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget ||
      e.relatedTarget.className !== "search_dropdown_item"
    ) {
      setShowList(false);
    }
  };

  const navigate = useNavigate();

  const handleInputFocus = () => {
    setShowList(true);
  };

  const handleInputKeyDown = (e) => {
    console.log(e.key);
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
          // Navigate to the selected suggestion's page or perform another action
          window.location.href = `/klussen${slicedResults[selectedIndex].link}`;
        }
        break;
      default:
        break;
    }
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

      return tasks.length > 0 ? tasks : [];
    });

    const specialistResults = specialists
      .filter((specialist) =>
        specialist.name.toLowerCase().includes(searchTerm)
      )
      .map((specialist: Specialist) => ({
        specialistName: specialist.name.toLowerCase(),
        task: "", // Assuming a task field is required, you might want to adjust this
        link: specialist.link || "", // Assuming a link field is required, you might want to adjust this
      }));

    return [...taskResults, ...specialistResults];
  };

  const slicedResults = searchResults().slice(0, 5); // Beperk tot de eerste 5 resultaten

  const resultsRender = slicedResults.map((result, index) => (
    <Link
      to={`/klussen${result.link}`}
      key={index}
      className={`search_dropdown_item ${
        index === selectedIndex ? "selected" : ""
      }`}
    >
      <span onClick={() => navigateToResult(result.link)}>
        {`${result.specialistName ? `${result.specialistName} - ` : ""}${
          result.task
        }`}
      </span>
    </Link>
  ));

  // Helper function to navigate to the selected result
  const navigateToResult = (link: string) => {
    navigate(`/klussen${link}`);
  };

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
          onKeyDown={handleInputKeyDown}
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
