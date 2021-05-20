import { useEffect, useRef, useState } from "react";
import { AutoComplete } from "../interfaces/interface";
import HttpService from "../services/HttpService";
import LoadingSpinner from "./LoadingSpinner";
const CityModal = ({
  setShowModal,
  setCurrentCity
}: {
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  setCurrentCity: (value: React.SetStateAction<string>) => void;
}): JSX.Element => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<AutoComplete[]>([]);
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const box = useRef(null);
  const client = HttpService.getHttpClient();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLocation(value);
    if (value !== "") {
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
    setPlaceId(item.placeId);
    setSuggestions([]);
  };

  const handleFocusOut = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event: MouseEvent): any {
        if (ref.current && !ref.current.contains(event.target)) {
          setSuggestions([]);
        }
      }

      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
    }, [ref]);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const { data } = await client.post("/place/id", {
      placeId,
    });
    localStorage.setItem("lat", JSON.stringify(data?.lat));
    localStorage.setItem("long", JSON.stringify(data.lng));
    localStorage.setItem("city", JSON.stringify(data?.city));
    localStorage.setItem("locationSet", JSON.stringify(true));
    setIsLoading(false);
    setCurrentCity(data?.city);
    setShowModal(false);
  };

  handleFocusOut(box);

  return (
    <div
      className="fixed z-10 inset-0"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="h-full w-full bg-gray400 bg-opacity-75 flex justify-center items-center">
        <div className="flex flex-col justify-between align-bottom bg-white rounded-lg text-left text-2xl overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-2/3 md:w-1/3 lg:w-1/4 h-4/5">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start gap-y-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full icon-avatar sm:mx-0 sm:h-10 sm:w-10 p-1 flex-grow-0">
                <img src="/images/location.svg" alt="location" />
              </div>
              <div className="text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                <label
                  className="text-3xl leading-6 font-medium text-gray-900 mb-8"
                  id="modal-title"
                >
                  Enter your current city
                </label>
                <div className="w-full searchbox-container" ref={box}>
                  <input
                    className="outline-none border-b-2 text-textgray border-gray400 focus:border-secondary focus:text-secondary w-full text-3xl p-2"
                    type="text"
                    value={location}
                    onChange={handleChange}
                  />
                  <div className="autocomplete-container mt-16">
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
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-primary font-medium text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto text-3xl md:w-1/4"
              onClick={!isLoading ? handleSave : undefined}
              disabled={placeId === null}
            >
              {isLoading ? <LoadingSpinner /> : <span>Save</span>}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto text-3xl md:w-1/4"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityModal;
