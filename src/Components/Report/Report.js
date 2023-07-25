import React, { useEffect, useState } from "react";
import ToggleButton from "react-toggle-button";
import { injectModels } from "../../Redux/injectModels";
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { routes } from "../../Constants/routes";

function Report(props) {

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('All');
  const [masterReports, setMasterReports] = useState([])
  const [error, setError] = useState('');
  const [selectedAction, setSelectedAction] = useState('initiated');
  const [detail, setDetail] = useState("");

  const [reportType, setReportType] = useState("");
  const [reportedId, setReportedId] = useState("");
  const [parentId, setParentId] = useState("");
  const [isClearIcon, setIsClearIcon] = useState(true);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const imagePath = `${process.env.REACT_APP_API_IMAGEPATH}/`
  const videopath = `${process.env.REACT_APP_API_VIDEOPATH}/`

  const videoStyle = {
    height: '100px',
    width: '100px',
    cursor: 'pointer'
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAction('initiated');
    setDetail("");
  }
  const handleShow = () => setShowModal(true);

  //const navigate = useNavigate();

  useEffect(() => {
    getData();
    toggleClearIcon("");
  }, []);



  const getData = async () => {
    props.application.setLoading(true);
    try {
      const res = await props.admin.getMasterLookupData();
      if (res.masterReports.length > 0) {
        setMasterReports(res.masterReports);
        setData(res.masterReports);
        props.application.setLoading(false);
      }
      else {
        props.application.setLoading(false);
      }
    } catch (error) {
      props.application.setLoading(false);
    }
  };

  const handleDetail = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Report detail is required!");
    } else {
      setError("");
    }
    setDetail(val);
  };


  const handleDropdownChange = async (e) => {
    e.preventDefault()
    setSelectedValue(e.target.value);
    const selectedText = e.target.options[e.target.selectedIndex].text;
    const res = await props.admin.getMasterLookupData();
    if (selectedText !== '') {
      if (selectedText === "All") {
        setMasterReports(res.masterReports);
        setData(res.masterReports);
      }
      else {
        const updatedFilteredData = res.masterReports.filter(item => item.type === selectedText.toLowerCase());
        setMasterReports(updatedFilteredData);
        setData(updatedFilteredData);
      }
    }
    else {
      setMasterReports(res.masterReports);
      setData(res.masterReports);
    }
  };

  const handleActionDropdownChange = (e) => {
    e.preventDefault()
    setSelectedAction(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    toggleClearIcon("");
    getData();
  };

  const toggleClearIcon = (value) => {
    const clearIcon = document.querySelector(".clear-icon");
    if (value === "") {
      clearIcon.style.display = "none";
    } else {
      clearIcon.style.display = "block";
    }
  };

  // const handleSearch = (searchQuery) => {
  //   setSearchQuery(searchQuery);
  //   setCurrentPage(0); // Reset current page to 0 after search
  //   toggleClearIcon(searchQuery);
  //   const filteredData = data.filter(row => {
  //     return Object.values(row).some(value => {
  //       // Null check and optional chaining on value and searchQuery
  //       return value?.toLowerCase?.().includes(searchQuery?.toLowerCase?.());
  //     });
  //   });
  //   setMasterReports(filteredData);
  // }

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(0); // Reset current page to 0 after search
    
    toggleClearIcon(searchQuery);
    
    const filteredData = searchJSON(data, searchQuery);
    setMasterReports(filteredData);
  };

  var serachList = ["type","description","username","status","createdon","actiondesc"];

  const searchJSON = (data, searchQuery) => {
    const filteredData = [];
  
    const searchRecursive = (obj,parentObject) => {
      for (let key in obj) {
        if (!(typeof obj[key] === "object")) {
          if (typeof obj[key] === "string" && obj[key].toLowerCase().includes(searchQuery.toLowerCase())) {
            if(serachList.includes(key.toLowerCase()))
            { console.log(key + ': ' + obj[key]);
              filteredData.push((parentObject!=null)?parentObject:obj);
              break;
            }
          }
        }
        else
        {
          if(obj[key] !== null)
          {
            searchRecursive(obj[key],obj);
            break;
          }
        }
      }
    };
  
    for (let i = 0; i < data.length; i++) {
      searchRecursive(data[i]);
    }
  
    return filteredData;
  };
  const renderPagination = () => {
    const pageCount = Math.ceil(masterReports.length / rowsPerPage);
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

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  
    // Check if it's the first page
    if (selected === 0) {
      setShowPreviousButton(false);
    } else {
      setShowPreviousButton(true);
    }
  
    // Check if it's the last page
    const pageCount = Math.ceil(masterReports.length / rowsPerPage);
    if (selected === pageCount - 1 || pageCount === 1) { // Update the condition here
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  };

  const rowsPerPage = 10; // Number of rows to display per page
  const offset = currentPage * rowsPerPage; // Calculate the offset based on current page
  const paginatedData = masterReports.slice(offset, offset + rowsPerPage);

  const handleStatus = async (e) => {
    e.preventDefault();
    let valid = true;

    if (selectedAction === "") {
      setError("Action is required!");
      valid = false;
      return;
    } else {
      setError("");
    }
    if (detail === "") {
      setError("Action details is required!");
      valid = false;
      return;
    } else {
      setError("");
    }
    if (!valid) {
      setError("Please fill all fields!");
      return;
    } else {
      setError("");

      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to take action on this report?',
        showCancelButton: true,
        confirmButtonColor: "#3f6dcf",
        cancelButtonColor: "#373737",
        confirmButtonText: `Yes`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            props.application.setLoading(true);
            const data = {
              type: reportType,
              actionId: reportedId,
              parentId: parentId,
              actionStatus: selectedAction,
              description: detail
            };
            const res = await props.admin.ReportAction(data);
            if (res.data.success) {
              handleClose()
              getData();
              setSelectedValue("All");
              props.application.setLoading(false);
              Swal.fire("Report!", res.data.message);
            }
            else {
              getData();
              setSelectedValue("All");
              //handleClose()
              props.application.setLoading(false);
              Swal.fire("Report!", "Something went wrong!");
            }
          } catch (err) {
            //handleClose()
            setSelectedValue("All");
            props.application.setLoading(false);
            console.log(err);
            Swal.fire("Report!", "Something went wrong!", "error");
            return Promise.reject(err);
          }
        }
      });
    }
  };

  const userProf = (Path, name) => {
    return <span><img src={
      Path == null || Path == ""
        ? "/assets/img/default-image.png" 
        : imagePath + Path
    } alt="" className="userImage"></img><p><strong>{name}</strong></p></span>;
  }

  const VideoProf = (path) => {
    return <video controls style={videoStyle}>
      <source src={videopath + path} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

  }

  const handleAction = async (reportType, reportedId, parentId) => {
    handleShow();
    setReportType(reportType);
    setReportedId(reportedId);
    setParentId(parentId);
  }

  return (
    <React.Fragment>
      <div className="pagetitle">
        <h1>Reports</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
            <li className="breadcrumb-item active">Reports</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-xxl-2 col-md-4">
          <select className="form-select mb-3" value={selectedValue} onChange={handleDropdownChange}>
            <option value="All">All</option>
            <option value="User Report">User Report</option>
            <option value="Live Video Report">Live Video Report</option>
            <option value="Comment Report">Comment Report</option>
          </select>
        </div>
        <div className="col-xxl-10 col-md-8">
          {/* <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="form-control mb-3"
          /> */}
          <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
          className="form-control mb-3"
        />
        <i className="fas fa-search search-icon"></i>
        {isClearIcon && <i className="fas fa-times clear-icon"  onClick={clearSearch}></i>}
      </div>
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            {/* <th>Report ID</th> */}
            <th>Type</th>
            <th>Description</th>
            <th>Reported By</th>
            <th>Report</th>
            <th>Action Status</th>
            <th>Created On</th>
            <th>Status</th>
            <th>Action Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData && paginatedData.length > 0 ? (
            <React.Fragment>
              {paginatedData.map((report, idx) => (
                <tr key={report._id}>
                  <td>{offset + idx + 1}</td>
                  {/* <td>{report._id}</td> */}
                  <td>{report.type}</td>
                  <td>{report.description}</td>
                  <td>{report.user?.username}</td>
                  <td>
                    {report.type === "user report" ? userProf(report.reportedUser.image, report.reportedUser.username) :
                      (report.type === "live video report" ? VideoProf(report.video.video) :
                        (report.type === "comment report" ?
                          (report.comment.description ? report.comment.description : report.comment.description1) :
                          ""))
                    }
                  </td>
                  <td>{report.status}</td>
                  <td>{moment(report.createdOn).format('DD-MM-YYYY')}</td>
                  <td><ToggleButton value={report.isActive} /></td>
                  <td>{report.actionDesc}</td>
                  <td>
                    <Link title="block"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction(report.type,(report.type === "user report" ? report.reportedUser._id : report.type === "live video report" ? 
                                    report.video._id : report.type === "comment report" ? report.comment.matched:""), report._id);
                      }}>
                      <i className="fa-solid fa-ban"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ) : (
            <tr>
              <td colSpan="10 mt-2">No results found!</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <strong>Total Count: {masterReports.length}</strong>
        {renderPagination()}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="searchformfld">
              <select className="form-select mb-3" value={selectedAction} onChange={handleActionDropdownChange}>
                <option value="Initiated">Initiated</option>
                <option value="No Action">No Action</option>
                <option value="Block">Block</option>
              </select>
              <textarea className="form-control mb-3" placeholder="Description*" rows={5} cols={5} value={detail} onChange={handleDetail} />
            </div>
          </form>
        </Modal.Body>
        {error && (
          <div className="col-xs-12 col-md-12 col-lg-12">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary custom-button-colour" onClick={handleStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     
    </React.Fragment>
  )
}
export default injectModels(["admin", 'application'])(Report);