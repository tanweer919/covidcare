import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import HttpService from "../services/HttpService";
import { AutoComplete } from "../interfaces/interface";
const SearchBox = ({
  handleCitySelection,
}: {
  handleCitySelection: (city: string, placeId: string) => void;
}): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<AutoComplete[]>([]);
  const box = useRef(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLocation(value);
    if (value !== "") {
      const client = HttpService.getHttpClient();
      const { data }: { data: AutoComplete[] } = await client.post(
        "/autocomplete",
        {
          input: value,
        }
      );
      setSuggestions(data);
    }
  };

  const handleSuggestionItemClick = (item: AutoComplete) => {
    setLocation(item.term);
    handleCitySelection(item.term, item.placeId);
    setSuggestions([]);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  const handleFocusOut = (ref: MutableRefObject<any>) => {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event: MouseEvent): any {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocus(false);
          setSuggestions([]);
        }
      }

      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
    }, [ref]);
  };

  handleFocusOut(box);

  return (
    <div className="searchbox-container" ref={box}>
      <div
        className={`search-box${
          focus ? " search-box--active" : ""
        } md:rounded-full`}
      >
        <img src="/images/search.svg" className="search-box__search-icon" alt="searh icon"/>
        <input
          type="text"
          className="search-box__input"
          placeholder="Search for location"
          onFocus={handleFocus}
          onChange={handleChange}
          name="location"
          value={location}
        />
      </div>
      <div className="autocomplete-container">
        {suggestions.map((suggestion, i) => (
          <div
            className="autocomplete-item"
            key={i}
            onClick={() => {
              handleSuggestionItemClick(suggestion);
            }}
          >
            <img
              src="/images/location.svg"
              alt="location_pin"
              className="h-6 mr-2"
            />
            <span>{suggestion.term}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
