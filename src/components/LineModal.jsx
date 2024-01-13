import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const LineModal = ({ line, onClose }) => {
  const [data, setData] = useState([]);
  const [arrivalData, setArrivalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cancelButtonRef = useRef(null);

  const fetchLine = async () => {
    try {
      const response = await axios.get(
        `https://api.tfl.gov.uk/Line/${line.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching line data:", error);
    }
  };

  const fetchArrivalTime = async () => {
    try {
      const response = await axios.get(
        `https://api.tfl.gov.uk/line/${line.id}/arrivals`
      );
      setArrivalData(response.data);
    } catch (error) {
      console.error("Error fetching arrival data:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched (either success or error)
    }
  };

  useEffect(() => {
    fetchLine();
    fetchArrivalTime();
  }, []);

  const formatArrivalTime = (expectedArrival) => {
    const arrivalDate = new Date(expectedArrival);
    const hours = arrivalDate.getHours().toString().padStart(2, "0");
    const minutes = arrivalDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && data.length > 0 && (
        <Transition.Root show={line !== null} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={onClose}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                    <div className="w-full relative flex rounded-lg items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <IoMdClose />
                      </button>

                      <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:items-center lg:gap-x-8">
                        <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Bakerloo_Line.png"
                            alt="Tube Line"
                            className="object-center object-cover"
                          />
                        </div>
                        <div className="sm:col-span-8 lg:col-span-7">
                          <h2 className="text-xl font-medium text-gray-900 sm:pr-12">
                            {line.name} line
                          </h2>

                          <section
                            aria-labelledby="options-heading"
                            className="mt-8"
                          >
                            <h3 id="options-heading" className="sr-only">
                              Product options
                            </h3>

                            <form>
                              {/* Color picker */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                  Upcoming arrival
                                </h4>

                                {arrivalData && arrivalData.length > 0 ? (
                                  <p>
                                    {arrivalData[0].stationName} on{" "}
                                    {arrivalData[0].platformName} towards{" "}
                                    {arrivalData[0].destinationName} arriving at{" "}
                                    {formatArrivalTime(
                                      arrivalData[0].expectedArrival
                                    )}
                                    .
                                  </p>
                                ) : (
                                  <p>No data available.</p>
                                )}
                              </div>

                              <div
                                className={`mt-8 w-full rounded-md py-3 px-8 flex items-center justify-center text-base font-medium hover:outline-none ${
                                  line.disruptions.length !== 0
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                              >
                                <svg
                                  className={`mr-1.5 h-2 w-2 ${
                                    line.disruptions.length !== 0
                                      ? "text-red-400"
                                      : " text-green-400"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 8 8"
                                >
                                  <circle cx={4} cy={4} r={3} />
                                </svg>
                                {line.disruptions.length !== 0
                                  ? "Not Operational"
                                  : "Operational"}
                              </div>

                              <p className="absolute top-4 left-4 text-center sm:static sm:mt-8">
                                <a
                                  href="https://tfl.gov.uk/fares/how-to-pay-and-where-to-buy-tickets-and-oyster/buying-tickets-and-oyster"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Buy tickets
                                </a>
                              </p>
                            </form>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default LineModal;
