import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { injectModels } from "../../Redux/injectModels";
import ToggleButton from "react-toggle-button";
import { Link } from "react-router-dom";
import { routes } from "../../Constants/routes";

function Notification(props) {
  const [showModal, setShow] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async (e) => {
    setId("");
    setName("");
    setDetail("");
    handleShow();
    setError("");
  }

  const getData = async () => {
    props.application.setLoading(true);
    try {
      const res = await props.admin.getAllNotification();
      setData(res.notifications);
      props.application.setLoading(false);
    } catch (error) {
      props.application.setLoading(false);
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Notification name is required!");
    } else {
      setError("");
    }
    setName(val);
  };

  const handleDetail = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Notification detail is required!");
    } else {
      setError("");
    }
    setDetail(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
  
    if (name === "") {
      setError("Notification name is required!");
      valid = false;
      return;
    } else {
      setError("");
    }
    if (detail === "") {
      setError("Notification detail is required!");
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
      try {
        props.application.setLoading(true);
        if(id === "")
        {
          const data = {
            name: name.trim(),
            description: detail.trim()
          };
          const responce = await props.admin.addNotification(data);
          if(responce.data.message === 'success'){
            props.application.setLoading(false);
            toast.success("Notification added successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          else {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
            });
            props.application.setLoading(false);
          }
        }
        else {
          const data = {
            name: name.trim(),
            description: detail.trim(),
            id: id
          };
          const responce = await props.admin.updateNotification(data);
          if(responce.data.success === true){
            props.application.setLoading(false);
            toast.success("Notification updated successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          else {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
            });
            props.application.setLoading(false);
          }
        }
        handleClose();
        setId("");
        getData();
      } catch (err) {
        props.application.setLoading(false);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setId("");
        console.log(err);
        // return Promise.reject(err);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      props.application.setLoading(true);
      const res = await props.admin.getNotificationById(id);
      setName(res.notification.name);
      setDetail(res.notification.description);
      setId(id);
      handleShow();
      props.application.setLoading(false);
    } catch (error) {
      props.application.setLoading(false);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
   
  }

  const handleDelete = async (id) => {  
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this Notification?',
      showCancelButton: true,
      confirmButtonColor: "#3f6dcf",
      cancelButtonColor: "#373737",
      confirmButtonText: `Yes`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          props.application.setLoading(true);
          const res = await props.admin.deleteNotificationById(id);
          if(res.success === true){
            getData();
            props.application.setLoading(false);
            Swal.fire("Notification!", "Notification is deleted!", "success");
          }
          else {
            Swal.fire("Notification!", "Something went wrong!", "error");
          }
        } catch (err) {
          props.application.setLoading(false);
          console.log(err);
          Swal.fire("Notification!", "Something went wrong!", "error");
          return Promise.reject(err);
        }
      }
    });
  };

  return (
    <React.Fragment>
    <div className="pagetitle">
     <h1>Notification</h1>
     <nav>
       <ol className="breadcrumb">
       <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
         <li className="breadcrumb-item active">Notification</li>
       </ol>
     </nav>
   </div>
    {/* {isDataLength === false ? <div className="verifier-buttton">
     <Button onClick={handleAdd}>Add Privacy Policy</Button>{" "}
   </div> : "" } */}
   <div className="verifier-buttton">
     <Button onClick={handleAdd}>Add Notification</Button>{" "}
   </div>
     <Modal show={showModal} onHide={handleClose}>
     <Modal.Header closeButton className="modal-main-header">
       <Modal.Title>{id === "" ? 'Add' : 'Update'} Notification</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <form>
         <div className="searchformfld">
           <input
             type="text"
             className="form-control mb-3"
             placeholder="Notification name*"
             value={name}
             onChange={handleName}
             required
           />
           <textarea className="form-control mb-3" placeholder="Notification detail*" rows={5} cols={5} value={detail} onChange={handleDetail}/>
         </div>
       </form>
       <div className='d-flex align-items-center justify-content-center'>
        <Button type="submit" variant="primary custom-button-colour" onClick={handleSubmit}>
        {id === "" ? 'Save Changes' : 'Update Changes'}
        </Button>
      </div>
     </Modal.Body>
     {error && (
       <div className="col-xs-12 col-md-12 col-lg-12">
         <div className="alert alert-danger">{error}</div>
       </div>
     )}
     {/* <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       <Button type="submit" variant="primary custom-button-colour" onClick={handleSubmit}>
       {id === "" ? 'Save Changes' : 'Update Changes'}
       </Button>
     </Modal.Footer> */}
   </Modal>
     <table id="about" className="table table-bordered table-striped">
     <thead>
     <tr>
     <th>S.No</th>
     <th>Notification Name</th>
     <th>Notification Description</th>
     <th>Status</th>
     <th>Action</th>
     </tr>
     </thead>
     <tbody>
     {data && data.length > 0 ? (
         <React.Fragment>
           {data.map((item, idx) => {
             return (
               <tr key={idx}>
                 <td>{idx + 1}</td>
                 <td>{item.name}</td>
                 <td>{item.description}</td>
                 <td>
                 {item.isActive === true? 'Active':'Deactive'}
                 </td>
                 <td>
                 <div className="delete-create">
                 <Link
                     onClick={(e)=>{
                       e.preventDefault();
                       handleEdit(item._id);
                   }} >
                     <i className="fa-solid fa-pen-to-square"></i>
                   </Link>
                  <Link
                     onClick={(e)=>{
                       e.preventDefault();
                       handleDelete(item._id);
                   }} >
                     <i className="fa-sharp fa-solid fa-trash"></i>
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
     </tbody></table>
     
 </React.Fragment>
  );
}

export default injectModels(["admin", 'application'])(Notification);
