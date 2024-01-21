import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../store";

export default function SearchBar() {
  const { searchVenues } = store();
  const [searchWord, setSearchWord] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event) => {
    const newSearchWord = event.target.value;
    setSearchWord(newSearchWord);
  };

  useEffect(() => {
    const newFilteredData = searchVenues.filter((venue) =>
      venue.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    setFilteredData(newFilteredData);
  }, [searchWord, searchVenues]);

  return (
    <div className="relative w-full max-w-xs">
      <label className="form-control">
        <div className="label">
          <span className="label-text font-bold text-[#161616]">
            Search by title
          </span>
        </div>
        <input
          type="text"
          placeholder="E.g., 'Wooden cabin'"
          className="input input-bordered w-full max-w-xs bg-white"
          onChange={handleFilter}
        />
      </label>
      {searchWord && (
        <div className="absolute flex flex-col w-full max-w-xs z-10 bg-white gap-4 p-4 shadow-md mt-1">
          {filteredData.length === 0 ? (
            <p>No results</p>
          ) : (
            filteredData.map((value) => (
              <div key={value.id} className="flex flex-row items-center gap-4">
                <div className="h-12 w-12">
                  {value.media[0] ? (
                    <img
                      className="object-cover h-full w-full"
                      src={value.media[0]}
                      alt={value.name}
                    />
                  ) : (
                    <img
                      className="object-cover h-full w-full"
                      src="/noimage.webp"
                      alt={value.name}
                    />
                  )}
                </div>
                <Link to={`/venue/${value.id}`} className="text-left">
                  <p className="text-sm font-bold">{value.name}</p>
                  <p className="text-sm">{value.price} NOK per night</p>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
