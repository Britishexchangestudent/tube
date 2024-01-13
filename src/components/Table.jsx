import React, { useState } from "react";
import Badge from "./Badge";
import LineModal from "./LineModal";

const Table = ({ lines }) => {
  const [selectedLine, setSelectedLine] = useState(null);

  const openModal = (line) => {
    setSelectedLine(line);
  };

  const closeModal = () => {
    setSelectedLine(null);
  };
  return (
    <div className="flex flex-col mx-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Operational
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lines.length > 0 &&
                  lines.map((line) => {
                    return (
                      <tr key={line.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {line.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {line.disruptions.length === 0 ? (
                            <Badge disruptions={false} />
                          ) : (
                            <Badge disruptions={true} />
                          )}
                        </td>

                        <td
                          onClick={() => openModal(line)}
                          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-indigo-600 hover:text-indigo-900 cursor-pointer hover:underline"
                        >
                          View
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {selectedLine && (
              <LineModal line={selectedLine} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
