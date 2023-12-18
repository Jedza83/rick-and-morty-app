import { useRef, useEffect } from "react";

const Pagination = ({
  charactersPerPage,
  totalCharacters,
  currentPage,
  onPageChange,
  onLoadMore,
}) => {
  const pageNumbers = [];
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    observerRef.current.observe(document.querySelector(".pagination-bottom"));

    return () => observerRef.current.disconnect();
  }, [onLoadMore]);

  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul style={{ visibility: pageNumbers.length > 0 ? "visible" : "hidden" }}>
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
      <div className="pagination-bottom"></div>
    </div>
  );
};

export default Pagination;
