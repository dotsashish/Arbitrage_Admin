import React from "react";
import { useEffect, useState } from "react";
import { injectModels } from "../../Redux/injectModels";
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { routes } from "../../Constants/routes";

function Contact(props) {

  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});
  const [isClearIcon, setIsClearIcon] = useState(true);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    getData();
    toggleClearIcon("");
  }, []);

  const getData = async () => {
    props.application.setLoading(true);
    try {
      const res = await props.admin.getAllContact();
      if(res.contacts.length > 0){
        setData(res.contacts);
        setFilteredData(res.contacts)
        props.application.setLoading(false);
      }
      else {
        props.application.setLoading(false);
      }
      
    } catch (error) {
      props.application.setLoading(false);
    }
  };

  var serachList = ["firstName","lastName","email","contactNo","message","createdOn"];

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(0); // Reset current page to 0 after search
    toggleClearIcon(searchQuery);
    const filteredData = data.filter(row => {
      return Object.values(row).some(value => {
        const key = Object.keys(row).find((k) => row[k] === value);
        // Null check and optional chaining on value and searchQuery
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
        <h1>Contacts</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
            <li className="breadcrumb-item active">Contacts</li>
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
      <table id="help" className="table table-bordered table-striped">
        <thead>
        <tr>
            <th>S.No</th>
            <th>Name</th>
            {/* <th>Last Name</th> */}
            <th>Email Address</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {paginatedData && paginatedData.length > 0 ? (
            <React.Fragment>
              {paginatedData.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.fullName}</td>
                    {/* <td>{item.lastName}</td> */}
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
                    <td>{moment(item.createdOn).format('DD-MM-YYYY')}</td>
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
  )
}
export default injectModels(["admin", 'application'])(Contact);