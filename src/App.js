import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Table from "./components/Table";
import { debounce } from "./utils/debounce";

function App() {
  const [allLines, setAllLines] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllLines = async () => {
    try {
      const response = await axios.get(`https://api.tfl.gov.uk/Line/Mode/tube`);
      setAllLines(response.data);
      setFilteredLines(response.data);
    } catch (error) {
      console.error("Error fetching all lines:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched (either success or error)
    }
  };

  const fetchLineStatuses = async () => {
    try {
      const response = await axios.get(
        `https://api.tfl.gov.uk/Line/mode/tube/status`
      );
      setStatus(response.data);
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched (either success or error)
    }
  };

  const debouncedSearch = debounce((term) => {
    const filtered = allLines.filter((line) =>
      line.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLines(filtered);
  }, 100);

  useEffect(() => {
    fetchAllLines();
    fetchLineStatuses();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setFilteredLines(allLines);
    }
  }, [searchTerm, allLines, debouncedSearch]);

  const clearSearch = () => {
    setFilteredLines(allLines);
    setSearchTerm("");
  };

  return (
    <>
      <div>
        <Input onSearch={(term) => setSearchTerm(term)} value={searchTerm} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredLines.length > 0 && status.length > 0 ? (
        <div className="mt-4">
          <Table lines={filteredLines} status={status} />
        </div>
      ) : (
        <div className="mt-4">
          <p>No lines match your search.</p>
          <button
            className="text-indigo-600 hover:text-indigo-500"
            onClick={clearSearch}
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}

export default App;
