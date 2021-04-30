import React, { useState } from "react";

const SearchBox = (): JSX.Element => {
  const [focus, setFocus] = useState(false);

  const locations = [
    "Koderma",
    "Kolkata",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Jaipur",
    "Ranchi",
  ];
  const [location, setLocation] = useState("");
  const [matchingLocations, setMatchingLocations] = useState<string[]>([]);
  const filterCity = () => {
    const filteredLocations =
      location != ""
        ? locations.filter((filteredLocation) => filteredLocation.toLowerCase().includes(location.toLowerCase()))
        : [];
        console.log(filteredLocations)
    setMatchingLocations(filteredLocations);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLocation(value);
    filterCity();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    setMatchingLocations([]);
  };

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
      <div className="autocomplete-container">
        {matchingLocations.map((loc, i) => (
          <div className="autocomplete-item" key={i}>
            {loc}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
