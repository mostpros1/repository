import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { taal } from "../../ui/NavBar/Navigation.tsx";
import specialists from "../../../data/specialists.ts";
import Fuse from "fuse.js";

// Capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

interface SearchResultItem {
  id: number;
  name: string;
  tasks: { task: string; link?: string }[];
}

function highlightMatch(text, highlight) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

const SearchResults = ({
  results,
  selectedIndex,
  handleResultClick,
  value,
}) => (
  <>
    {results.map((result, index) => (
      <Link
        to={`/${taal}/jobs#${result.name.toLowerCase()}?${
          result.tasks[0]?.link?.replace(/\//g, "") ?? ""
        }`}
        key={index}
        className={`search_dropdown_item ${
          index === selectedIndex ? "active" : ""
        }`}
        onMouseDown={() =>
          handleResultClick(
            `#${result.name.toLowerCase()}?${result.tasks[0]?.link?.replace(
              /\//g,
              ""
            )}`
          )
        }
      >
        <div className={index === selectedIndex ? "selected" : ""}>
          {highlightMatch(result.name, value)} -{" "}
          {highlightMatch(result.tasks[0]?.task ?? "", value)}
        </div>
      </Link>
    ))}
  </>
);

function Searchbar() {
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [closestResults, setClosestResults] = useState<SearchResultItem[]>([]);
  const navigate = useNavigate();
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleInputBlur = (e) => {
    if (
      !e.relatedTarget ||
      !e.relatedTarget.classList.contains("search_dropdown_item")
    ) {
      setShowList(false);
    }
  };

  const handleInputFocus = () => {
    setShowList(true);
  };

  const handleResultClick = (link) => {
    navigate(`/nl/jobs${link}`);
  };

  const handleInputKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        break;
      case "ArrowDown":
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, resultsToDisplay.length - 1)
        );
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          const selectedResult = resultsToDisplay[selectedIndex];
          const selectedLink = selectedResult.tasks[0]?.link ?? "";
          handleResultClick(
            `#${selectedResult.name.toLowerCase()}?${selectedLink.replace(
              /\//g,
              ""
            )}`
          );
        }
        break;
      case "Tab":
        if (resultsToDisplay.length > 0) {
          const selectedResult = resultsToDisplay[0];
          setValue(selectedResult.tasks[0]?.task ?? "");
          setSelectedIndex(0);
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        performSearch(searchTerm);
      }, 300)
    );
  };

  const performSearch = (searchTerm) => {
    try {
      setSearchPerformed(true);

      const fuseOptions = {
        keys: ["name", "tasks.task", "tasks.link"],
        includeScore: true,
        threshold: 0.3,
        distance: 100,
        limit: 20,
      };

      const fuse = new Fuse(specialists, fuseOptions);
      const result = fuse.search(searchTerm);

      const closestResults = result
        .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
        .slice(0, 10)
        .map((res) => res.item);

      setClosestResults(closestResults);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const searchResults = () => {
    const searchTerm = value.trim().toLowerCase();
    if (!searchTerm) {
      return specialists.flatMap((specialist) =>
        specialist.tasks.map((task) => ({
          name: capitalizeFirstLetter(specialist.name),
          tasks: [
            {
              task: capitalizeFirstLetter(task.task),
              link: task.link,
            },
          ],
        }))
      );
    }

    const fuseOptions = {
      keys: ["name", "tasks.task", "tasks.link"],
      includeScore: true,
      threshold: 0.3,
      distance: 100,
      limit: 20,
    };

    const fuse = new Fuse(specialists, fuseOptions);
    const result = fuse.search(searchTerm);

    const taskResults = result.flatMap((res) => {
      return res.item.tasks
        .filter(
          (task) =>
            task.task.toLowerCase().includes(searchTerm) ||
            res.item.name.toLowerCase().includes(searchTerm)
        )
        .map((task) => ({
          name: capitalizeFirstLetter(res.item.name),
          tasks: [
            {
              task: capitalizeFirstLetter(task.task),
              link: task.link,
            },
          ],
        }));
    });

    return taskResults;
  };

  const slicedResults = searchResults().slice(0, 20);

  useEffect(() => {
    if (value.trim()) {
      performSearch(value.trim());
    } else {
      setClosestResults([]);
    }
  }, [value]);

  const resultsToDisplay =
    slicedResults.length > 0 ? slicedResults : closestResults;

  return (
    <div id="SearchBar-wrapper">
      <div className="SearchBarHome">
        <input
          id="SearchBarInputHome"
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          placeholder="Zoek een klus of specialist"
          className="search_input"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showList}
        />
        <article
          className="searchBarBlueIcon"
          onKeyDown={handleInputKeyDown}
        ></article>
      </div>
      <div className="search_results-con">
        {showList && (
          <div id="search-results" role="listbox" className="search_results">
            {resultsToDisplay.length > 0 ? (
              <SearchResults
                results={resultsToDisplay}
                selectedIndex={selectedIndex}
                handleResultClick={handleResultClick}
                value={value}
              />
            ) : (
              searchPerformed && (
                <div className="no_results">No results found</div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
