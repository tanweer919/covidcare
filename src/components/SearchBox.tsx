import React, { useState } from "react";
import HttpService from "../services/HttpService";
import { AutoComplete } from "../interfaces/interface";

const SearchBox = (): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<AutoComplete[]>([]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLocation(value);
    if (value !== "") {
      const client = HttpService.getHttpClient();
      const {data}: {data: AutoComplete[]} = await client.post("/autocomplete", { input: value });
      console.log(data);
      setSuggestions(data);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    setSuggestions([]);
  };

  return (
    <div className="searchbox-container">
      <div
        className={`search-box${
          focus ? " search-box--active" : ""
        } md:rounded-full`}
      >
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
        {suggestions.map((suggestion, i) => (
          <div className="autocomplete-item" key={i}>
            <img src="/images/location.svg" alt="location_pin" className="h-6 mr-2"/>
            <span>{suggestion.term}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
