import React, { useEffect, useState } from "react";
import ToggleButton from "react-toggle-button";
import { injectModels } from "../../Redux/injectModels";
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../Constants/routes";

function User(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});
  const [isClearIcon, setIsClearIcon] = useState(true);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const imagePath = `${process.env.REACT_APP_API_IMAGEPATH}/`
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    toggleClearIcon("");
  }, []);

  const getData = async () => {
    props.application.setLoading(true);
    try {
      const res = await props.admin.getAllUsers();
      const filteredUsers = res.user.filter(user => user.role != 'admin');
      if (filteredUsers.length > 0) {
        setData(filteredUsers);
        setFilteredData(filteredUsers)
        props.application.setLoading(false);
      } else {
        props.application.setLoading(false);
      }
    } catch (error) {
      props.application.setLoading(false);
    }
  };
  var serachList = ["firstName","lastName","userName","email"];

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(0); // Reset current page to 0 after search
    toggleClearIcon(searchQuery);
    const filteredData = data.filter(row => {
      console.log(row);
      return Object.values(row).some((value )=> {
        const key = Object.keys(row).find((k) => row[k] === value);


        return (serachList.includes(key))?value?.toLowerCase?.().includes(searchQuery?.toLowerCase?.()):null;
      });
    });
    setFilteredData(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery("");
    let searchText = document.getElementById("searchText");
    searchText.value="";
    toggleClearIcon("");
    const filteredData = data.filter(row => {

     

      return Object.values(row).some(value => {
        // Null check and optional chaining on value and searchQuery
        return value?.toLowerCase?.().includes("");
      });
    });
    setFilteredData(filteredData);
  };


  const toggleClearIcon = (value) => {
    const clearIcon = document.querySelector(".clear-icon");
    if (value === "") {
      clearIcon.style.display = "none";
    } else {
      clearIcon.style.display = "block";
    }
  };

  const rowsPerPage = 10; // Number of rows to display per page
  const offset = currentPage * rowsPerPage; // Calculate the offset based on current page
  const paginatedData = filteredData.slice(offset, offset + rowsPerPage);

  const handleStatus = async (id, isActive) => {
    Swal.fire({
      title: 'Confirmation',
      text: isActive === true ? 'Are you sure you want to block this User?' : 'Are you sure you want to unblock this User?',
      showCancelButton: true,
      confirmButtonColor: "#3f6dcf",
      cancelButtonColor: "#373737",
      confirmButtonText: `Yes`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          props.application.setLoading(true);

          const data = {
            isActive: isActive,
            id: id
          };

          await props.admin.blockUnblockUser(data);
          getData();
          props.application.setLoading(false);
          Swal.fire("User!", isActive === true ? "User is blocked!" : "User is unblocked!", "success");
        } catch (err) {
          props.application.setLoading(false);
          console.log(err);
          return Promise.reject(err);
        }
      }
    });
  };

  const redirectProfileHandle = (id) => {
    navigate(`/profile/${id}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  
    // Check if it's the first page
    if (selected === 0) {
      setShowPreviousButton(false);
    } else {
      setShowPreviousButton(true);
    }
  
    // Check if it's the last page
    const pageCount = Math.ceil(filteredData.length / rowsPerPage);
    if (selected === pageCount - 1 || pageCount === 1) { // Update the condition here
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(filteredData.length / rowsPerPage);
    if (pageCount > 1) {
      return (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel={showPreviousButton ? "Previous" : null}
          nextLabel={showNextButton ? "Next" : null}
          breakLabel="..."
          disableInitialCallback={true}
        />
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <div className="pagetitle">
        <h1>Users Management</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
            <li className="breadcrumb-item active">Users</li>
          </ol>
        </nav>
      </div>
      <div className="search-container">
        <input
          type="text"
          id="searchText"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
          className="form-control mb-3 brdr-c white-text"
        />
        <i className="fas fa-search search-icon"></i>
        {isClearIcon && <i className="fas fa-times clear-icon"  onClick={clearSearch}></i>}
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            {/* <th scope="col">Username</th> */}
            <th scope="col">Email </th>
            <th scope="col">Image</th>
            {/* <th>Status</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData && paginatedData.length > 0 ? (
            <React.Fragment>
              {paginatedData.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{offset + idx + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    {/* <td>{item.userName}</td> */}
                    <td>{item.email}</td>
                    <td>
                      <img
                        src={
                          item.image == null || item.image === ""
                            ? "/assets/img/default-image.png"
                            : imagePath + item.image
                        }
                        alt=""
                        className="userImage"
                      />
                    </td>
                    {/* <td><ToggleButton value={item.isActive}   onClick={(e) => {
                              e.preventDefault();
                              handleStatus(item._id, item.isActive);
                            }}/>
                    </td> */}
                    <td>
                      <div className="delete-create">
                        <Link
                          title="view profile"
                          onClick={(e) => {
                            e.preventDefault();
                            redirectProfileHandle(item._id);
                          }}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ) : (
            <tr>
              <td colSpan="10 mt-2">No results found!</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <strong>Total Count: {filteredData.length}</strong>
        {renderPagination()}
      </div>
    </React.Fragment>
  );
}

export default injectModels(["admin", 'application'])(User);
