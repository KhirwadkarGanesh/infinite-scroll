import React, { useId, useState } from "react";

function SearchInput({ handleSearch, isFetchingData }) {
  const searchInputId = useId();
  const [q, setQ] = useState("");

  const onSearch = () => {
    handleSearch(q);
  };

  return (
    <div className="flex flex-col items-start mb-8">
      <label htmlFor={searchInputId}>Search Here</label>
      <input
        disabled={isFetchingData}
        type="text"
        name="search-input"
        id={searchInputId}
        className="border-solid border-2 border-slate-700"
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        disabled={isFetchingData}
        onClick={onSearch}
        className="px-4 py-2 mt-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
      >
        Search
      </button>
    </div>
  );
}

export default SearchInput;
