const CityModal = ({
  handleClick,
}: {
  handleClick: (value: React.SetStateAction<boolean>) => void;
}): JSX.Element => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        <div
          className="fixed inset-0 bg-gray400 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left text-2xl overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-2/3 md:w-1/3 lg:w-1/4">
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
                <div className="w-full">
                  <input
                    className="outline-none border-b-2 text-textgray border-gray400 focus:border-secondary focus:text-secondary w-full text-3xl"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary font-medium text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto text-xl"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto text-xl"
              onClick={() => {
                handleClick(false);
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
