import React, { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import List from "./List";

function InfiniteScroll() {
  const [titleList, setTitleList] = useState([]);
  const [isTitleListLoading, setisTitleListLoading] = useState(false);
  const [query, setQuery] = useState("");
  const bottomElementRef = useRef();
  const [pageNumber, setPageNumber] = useState(1);

  const getData = async (query) => {
    try {
      setisTitleListLoading(true);
      const response = await fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({ q: query, page: pageNumber })
      );
      const data = await response.json();
      const list = data.docs.map((e) => e.title);
      setTitleList([...titleList, ...list]);
    } catch (error) {
      alert(error);
    } finally {
      setisTitleListLoading(false);
    }
  };

  const onHandleSearch = (q) => {
    setQuery(q);
    getData(q);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting && titleList.length) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    });

    observer.observe(bottomElementRef.current);

    return () => observer.disconnect();
  }, [titleList]);

  useEffect(() => {
    if (query && pageNumber) {
      getData(query, pageNumber);
    }
  }, [pageNumber]);

  return (
    <div className="p-2" id="infinite_scroll">
      <SearchInput
        handleSearch={onHandleSearch}
        isFetchingData={isTitleListLoading}
      />
      <hr />
      <List data={titleList} isDataLoading={isTitleListLoading} />
      <span ref={bottomElementRef}></span>
    </div>
  );
}

export default InfiniteScroll;
