import React from "react";
import { Button } from "@mui/material";
import "../Style/style.css";

function Pagination({
  nextPage,
  previousPage,
  makeApiRequest,
  getValueFromUrl,
  totalCount,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  dataApi,
}) {
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const generatePageNumbers = () => {
    const pages = [];
    const maxPages = 4;
    const currentPageIndex = currentPage;

    let startPage = Math.max(1, currentPageIndex - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    } else if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPages - 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePreviousClick = () => {
    if (previousPage) {
      const previousPageNumber = currentPage - 1;
      setCurrentPage(previousPageNumber);
      makeApiRequest(previousPage);
    }
  };

  const handleNextClick = () => {
    if (nextPage) {
      const nextPageNumber = currentPage + 1;
      setCurrentPage(nextPageNumber);
      makeApiRequest(nextPage);
    }
  };

  return (
    <div className="pagination-container">
      <Button
        disabled={!previousPage}
        onClick={handlePreviousClick}
        variant="outlined"
        className="pagination-button"
        style={{ margin: "5px" }}
      >
        Previous
      </Button>
      {generatePageNumbers().map((page) => (
        <Button
          key={page}
          onClick={() => {
            setCurrentPage(page);
            const apiPage = nextPage
              ? `${nextPage.split("page=")[0]}page=${page}`
              : `${dataApi}?page=${page}`;
            makeApiRequest(apiPage);
          }}
          variant="outlined"
          className={`pagination-button ${
            currentPage === page ? "active-page" : ""
          }`}
          style={{ margin: "5px" }}
        >
          {page}
        </Button>
      ))}
      <Button
        disabled={!nextPage}
        onClick={handleNextClick}
        variant="outlined"
        className="pagination-button"
        style={{ margin: "5px" }}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
