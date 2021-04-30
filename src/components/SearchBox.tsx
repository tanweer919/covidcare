import { useState } from "react";

const SearchBox = (): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
  };

  const [location, setLocation] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="searchbox-container">
      <div className={`search-box${focus ? " search-box--active" : ""}`}>
        <img src="/images/search.svg" className="search-box__search-icon" />
        <input
          type="text"
          className="search-box__input"
          placeholder="Search for location"
          onFocus={handleFocus}
          onBlur={handleFocusOut}
          onChange={handleChange}
          name="location"
        />
      </div>
      {/* <div className="autocomplete-container">
        {matchingCity.map((city, i) => (
          <div className="autocomplete-item" key={i}>
            {city}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SearchBox;
