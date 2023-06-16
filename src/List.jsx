import React from "react";

function List({ data = [], isDataLoading }) {
  return (
    <div>
      {data.map((e, i) => (
        <div
          id={i}
          key={i}
          className="text-center px-4 py-2 mt-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        >
          {e}
        </div>
      ))}
      {isDataLoading && <span>Loading...</span>}
    </div>
  );
}

export default List;
