/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import '../ReusebleTable/Table.css'
const Table = ({
  data = [],
  columns,
  showAction,
  showFooter,
  onEdit,
  onDelete,
  showExport,
  showFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const getDisplayedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filterData = (dataToFilter) => {
    if (!searchTerm) return dataToFilter;
    return dataToFilter.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const sortDisplayedData = (dataToSort) => {
    let sortableItems = [...dataToSort];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  };

  const displayedData = getDisplayedData();
  const filteredData = filterData(displayedData);
  const sortedDisplayedData = sortDisplayedData(filteredData);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : "pgbtn"}`}
        >
          <a
            className="page-link focus:outline-none"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };


  const statusStyles = {
    enable: {
      backgroundColor: "#6CBE1C", // Green background for Enable
      color: "#fff",
      borderRadius: "30px",
      padding: "5px 10px",
    },
    disable: {
      backgroundColor: "#F6F6F6", // Red background for Disable
      color: "#fff",
      borderRadius: "30px",
      padding: "5px 10px",
    },
    draft: {
      backgroundColor: "#D1D1EF",
      color: "#fff",
      borderRadius: "30px",
      padding: "5px 10px",
    },
    unpaid: {
      backgroundColor: "#EF3E49",
      color: "#fff",
      borderRadius: "30px",
      padding: "5px 10px",
    },
    paid: {
      backgroundColor: "#5856AC",
      color: "#fff",
      borderRadius: "30px",
      padding: "5px 10px",
    },
  };

  const downloadCSV = () => {
    const headers = columns.map((col) => col.header).join(",") + "\n";
    const rows = data
      .map((row) =>
        columns.map((col) => String(row[col.field] || "")).join(",")
      )
      .join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const handleFilterClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown
  };

  const renderFilterDropdown = () => {
    return (
      <div className="filter-dropdown" style={dropdownStyles}>

        <label>
          <input type="checkbox" /> Option 1
        </label>
        <label>
          <input type="checkbox" /> Option 2
        </label>
        <label>
          <input type="checkbox" /> Option 3
        </label>
        <button onClick={() => setShowDropdown(false)}>Apply Filter</button>
      </div>
    );
  };

  const dropdownStyles = {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    padding: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    zIndex: "1",
  };

  return (
    <div className="data-table-container">
      <div className="d-flex mb-3 mt-3">
        <div className="expense-searchcontainerstart d-flex">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              style={{ height: "40px", backgroundColor: "#fff", border: '1px solid #DBDBDB', boxShadow: "0px 0px 10px rgba(187, 187, 187, 0.25)" }}
            />
            <svg
              className="search-container-icon"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5416 19.2497C15.3511 19.2497 19.2499 15.3508 19.2499 10.5413C19.2499 5.73186 15.3511 1.83301 10.5416 1.83301C5.73211 1.83301 1.83325 5.73186 1.83325 10.5413C1.83325 15.3508 5.73211 19.2497 10.5416 19.2497Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.1666 20.1663L18.3333 18.333"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
         
        </div>
        <div >

          <div
            className="expense-search d-flex align-items-center"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DBDBDB",
              borderRadius: "10px",
              cursor: "pointer",
              width: "180px",
              height: "40px"

            }}
          >
            <span
              style={{
                fontFamily: "'Comfortaa'",
                fontStyle: "normal",
                fontWeight: "800",
                fontSize: "14px", // Compact text
                color: "#000000",
                marginLeft: "18px",

              }}
            >
              Show Rows:
            </span>
            <select
              name="option"
              id="pageSelect"
              className="selectoptions"
              style={{
                backgroundColor: "#D84040", // Match background color
                color: "#FFFFFF", // White text color
                fontFamily: "'Comfortaa'",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "16px",
                padding: "4px 6px", // Adjust padding for the dropdown
                border: "none", // No border
                borderRadius: "0 10px 10px 0", // Rounded on the right side only
                cursor: "pointer",
                height: "40px",
                marginLeft: "auto", // Push to the right
              }}
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to the first page on change
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
      
      <table className="data-table custom-table" style={{ 
          borderRadius: "20px 20px 0 0",
          border: "1px solid #EBEAF2",
          borderCollapse: "separate",
          borderSpacing: 0,
          overflow: "hidden"
        }}>
        <thead className="table-header">
          <tr>
            <th scope="col" className="no-column">
              No
            </th>
            {columns.map((col, index) => (
              <th key={index} scope="col" onClick={() => handleSort(col.field)}>
                {col.header}
                {sortConfig.key === col.field &&
                  (sortConfig.direction === "ascending" ? (
                    <svg
                      width="8"
                      height="4"
                      viewBox="0 0 8 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: "5px" }}
                    >
                      <path d="M0 4L4 0L8 4H0Z" fill="#000000" />
                    </svg>
                  ) : (
                    <svg
                      width="8"
                      height="4"
                      viewBox="0 0 8 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: "5px" }}
                    >
                      <path d="M0 0L4 4L8 0H0Z" fill="#000000" />
                    </svg>
                  ))}
              </th>
            ))}
            {showAction && (
              <th scope="col" className="action-column">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="table-body">
  {sortedDisplayedData.length === 0 ? (
    <tr>
      <td colSpan={columns.length + (showAction ? 2 : 1)} style={{ textAlign: "center", fontFamily: 'Comfortaa',
          fontWeight: '600',
          fontSize: '24px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) -92.86%, #4A5546 71.43%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent', }}>
        No data found
      </td>
    </tr>
  ) : (
    sortedDisplayedData.map((item) => (
      <tr key={item.id || item.index}>
        <td>
          {(currentPage - 1) * rowsPerPage + sortedDisplayedData.indexOf(item) + 1}
        </td>
        {columns.map((col, colIndex) => (
  <td key={colIndex}>
    {col.field === "status" ? (
      <div style={statusStyles[item[col.field]]}>
        {typeof item[col.field] === "string" && item[col.field]
          ? item[col.field].charAt(0).toUpperCase() + item[col.field].slice(1)
          : "-"}
      </div>
    ) : item[col.field] !== undefined && item[col.field] !== null ? (
      // New logic to handle array values
      Array.isArray(item[col.field])
        ? item[col.field].join(", ")
        : (typeof item[col.field] === "function"
            ? item[col.field]()
            : item[col.field])
    ) : (
      "-"
    )}
  </td>
))}
        {showAction && (
          <td className="action-column">
            <button className="action-button" onClick={() => onEdit(item)}>
              {/* Edit icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8067 4.695C14.0667 4.435 14.0667 4.00167 13.8067 3.755L12.2467 2.195C12 1.935 11.5667 1.935 11.3067 2.195L10.08 3.415L12.58 5.915M2 11.5017V14.0017H4.5L11.8733 6.62167L9.37333 4.12167L2 11.5017Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <button className="action-button" onClick={() => onDelete(item.id)}>
              {/* Delete icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.00016 12.6667C4.00016 13.4 4.60016 14 5.3335 14H10.6668C11.4002 14 12.0002 13.4 12.0002 12.6667V6C12.0002 5.26667 11.4002 4.66667 10.6668 4.66667H5.3335C4.60016 4.66667 4.00016 5.26667 4.00016 6V12.6667ZM12.0002 2.66667H10.3335L9.86016 2.19333C9.74016 2.07333 9.56683 2 9.3935 2H6.60683C6.4335 2 6.26016 2.07333 6.14016 2.19333L5.66683 2.66667H4.00016C3.6335 2.66667 3.3335 2.96667 3.3335 3.33333C3.3335 3.7 3.6335 4 4.00016 4H12.0002C12.3668 4 12.6668 3.7 12.6668 3.33333C12.6668 2.96667 12.3668 2.66667 12.0002 2.66667Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </td>
        )}
      </tr>
    ))
  )}
</tbody>

      </table>
      {showFooter && (
        <nav>
          <ul className="pagination">
            
            {renderPagination()}
           
            
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Table;
