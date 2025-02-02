import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Style/style.css";
import useAPIManager from "./Helper/useAPIManager";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Fade,
  Card,
  CardContent,
} from "@mui/material";
import FormWithDrawer from "./Forms/FormWithDrawer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "./Common/Pagination";
import loader from "./Assets/img/loader.gif"

import global from '../../config/Global.json'
import AuthContext from "../../utils/secure-route/AuthContext";

function APIManager(props) {
  let { authToken } = useContext(AuthContext);
  const dataSchema = props.data;
  const globalConfig = global;
  const token = authToken;
  const { Get, Delete, Patch, getAPI, getHost } = useAPIManager(
    globalConfig,
    token
  );
  const dataApi = getAPI(props.data.api);
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState(""); // Column to sort
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [anchorEls, setAnchorEls] = useState({}); // Updated state for menu anchors
  const [mounted, setMounted] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const updateFormTitle = props.updateFormTitle ? props.updateFormTitle : "";
  const createFormTitle = props.createFormTitle ? props.createFormTitle : "";
  const actionBtnName = props.actionBtnName
    ? props.actionBtnName
    : "Create New Data";
  const createRequired = props.createRequired === false ? false : true;
  const editRequired = props.editRequired === false ? false : true;
  const searchRequired = props.searchRequired === false ? false : true;

  const createField = dataSchema.createField;
  const editField = dataSchema.editField;
  const showField = dataSchema.showField;
  const manageRecord = true;

  let navigate = useNavigate();
  const getData = async () => {
    makeApiRequest(dataApi);
  };

  const makeApiRequest = async (api) => {
    try {
      setSearchQuery("");
      const result = await Get(api ? api : dataApi);
      setNextPage(result.next);
      setPreviousPage(result.previous);
      setTotalCount(result.count);
      setApiData(result.results);
      setFilteredData(result.results);
    } catch (err) {
      if (err.code == "ERR_BAD_REQUEST") {
        toast.error("Unauthorised access to page, Contact admin for access.");
        navigate("/");
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const pageChangeRequest = (url) => {
    if (getPageUrl(url) != null) {
      makeApiRequest(getHost() + getPageUrl(url));
    }
  };

  async function softDelete(data) {
    try {
      await Patch(dataApi, data["id"], { is_deleted: true })
        .then(() => {
          toast.success("Record updated successfully!");
          getData();
        })
        .catch((err) => {
          getData();
          toast.error(err || "Error");
        });
    } catch {
      getData();
      toast.error("Something Went wrong contact Humbingo");
    }
  }

  async function restore(data) {
    try {
      await Patch(dataApi, data["id"], { is_deleted: false })
        .then(() => {
          toast.success("Record updated successfully!");
          getData();
        })
        .catch((err) => {
          getData();
          toast.error(err || "Error");
        });
    } catch {
      getData();
      toast.error("Something Went wrong contact Humbingo");
    }
  }

  async function forceDelete(data) {
    await Swal.fire({
      title: "Data will be removed permanently! Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Delete(dataApi, data["id"])
            .then(() => {
              toast.success("Record updated successfully!");
              getData();
            })
            .catch((err) => {
              getData();
              toast.error(err || "Error");
            });
        } catch {
          getData();
          toast.error("Something Went wrong contact Humbingo");
        }
      }
    });
  }

  const getValueFromUrl = (url, parameterName) => {
    try {
      const regex = new RegExp(`${parameterName}=([^&]+)`);
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  function getPageUrl(url) {
    let urls = "";
    try {
      const urlObject = new URL(url);
      urls = urlObject.pathname + urlObject.search;
    } catch {
      return null;
    }
    return urls;
  }

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (loading && mounted) {
      getData();
    }
  }, [loading, mounted]);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    makeApiRequest(dataApi + "?search=" + query);
    setSearchQuery(query);
  };

  const handleSort = (columnKey) => {
    const isAsc = orderBy === columnKey && order === "asc";
    setOrderBy(columnKey);
    setOrder(isAsc ? "desc" : "asc");
    setSortedColumn(columnKey);
  };

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));
  const visibleRows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleMenuClick = (event, rowIndex) => {
    setAnchorEls((prev) => ({
      ...prev,
      [rowIndex]: event.currentTarget,
    }));
  };

  const handleMenuClose = (rowIndex) => {
    setAnchorEls((prev) => ({
      ...prev,
      [rowIndex]: null,
    }));
  };

  return (
    <>
      {loading ? (
        <center>
          <img
            src={loader}
            height="30px"
            width="30px"
            alt="Loading"
          />
         
        </center>
      ) : (
        <div className="row">
          <Card
            className="col-md-12"
            style={{ marginBottom: "10px", backgroundColor: "#A9A9A9" }}
          >
            <CardContent>
              {createRequired && (
                <FormWithDrawer
                  globalConfig={globalConfig}
                  token={token}
                  actionBtnName={actionBtnName}
                  inputFields={createField}
                  api={dataApi}
                  createFormTitle={createFormTitle}
                  refreshData={() => getData()}
                  buttonStyle={{ margin: "10px", backgroundColor: "#17202A" }}
                />
              )}
              {searchRequired && (
                <div className="search-table">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search..."
                    className="search-input-table"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#17202A" }}>
                  {showField.map((th, index) => {
                    const isSorted = orderBy === th.key;
                    const isAsc = orderBy === th.key && order === "asc";
                    return (
                      <TableCell
                        key={index}
                        style={{ color: "#FFF" }}
                        onClick={() => handleSort(th.key)}
                      >
                        {th.label} {isSorted && (isAsc ? "▲" : "▼")}
                      </TableCell>
                    );
                  })}
                  {manageRecord && (
                    <TableCell style={{ textAlign: "center", color: "#FFF" }}>
                      Action
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>


              <TableBody>



                {visibleRows.map((data, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    style={
                      data.is_disabled
                        ? {
                          backgroundColor: "#e0dfff",
                          borderBottom: "2px dashed orange",
                        }
                        : {}
                    }
                  >
                    {showField.map((field, i) => (
                      <TableCell key={i}>{data[field.key]}</TableCell>
                    ))}
                    {manageRecord && (
                      <TableCell>
                        {editRequired && (
                          <FormWithDrawer
                            globalConfig={globalConfig}
                            token={token}
                            actionBtnName="Edit"
                            inputFields={editField}
                            data={data}
                            api={dataApi}
                            onClick={() => handleMenuClose(rowIndex)}
                            refreshData={() => getData()}
                            buttonStyle={{ fontSize: "12px", padding: "5px" }}
                            buttonVarient="outlined"
                            updateFormTitle={updateFormTitle}
                            submitBtnTitle="Update Data"
                          />
                        )}

                        <Button
                          id={`fade-button-${rowIndex}`}
                          aria-controls={
                            anchorEls[rowIndex]
                              ? `fade-menu-${rowIndex}`
                              : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={
                            anchorEls[rowIndex] ? "true" : undefined
                          }
                          onClick={(event) => handleMenuClick(event, rowIndex)}
                          style={{ padding: "5px" }}
                        >
                          <MoreVertIcon />
                        </Button>
                        <Menu
                          id={`fade-menu-${rowIndex}`}
                          MenuListProps={{
                            "aria-labelledby": `fade-button-${rowIndex}`,
                          }}
                          anchorEl={anchorEls[rowIndex]}
                          open={Boolean(anchorEls[rowIndex])}
                          onClose={() => handleMenuClose(rowIndex)}
                          TransitionComponent={Fade}
                        >
                          {data.is_deleted ? (
                            <MenuItem onClick={() => restore(data)}>
                              Show Record
                            </MenuItem>
                          ) : (
                            <MenuItem onClick={() => softDelete(data)}>
                              Hide Record
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => forceDelete(data)}>
                            Remove Record
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}


              </TableBody>
            </Table>
            <Pagination
              nextPage={nextPage}
              previousPage={previousPage}
              makeApiRequest={pageChangeRequest}
              getValueFromUrl={getValueFromUrl}
              dataApi={dataApi}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </TableContainer>
        </div>
      )}
    </>
  );
}

export default APIManager;
