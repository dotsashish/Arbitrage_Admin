import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { injectModels } from "../../Redux/injectModels";
import ToggleButton from "react-toggle-button";
import { Link } from "react-router-dom";
import { coverImageTypes } from "../../Constants";
import { routes } from "../../Constants/routes";

function Banners(props) {

  const [showModal, setShow] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState({});
  const imagePath = `${process.env.REACT_APP_API_IMAGEPATH}/`;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");

  
  const handleFileChange = (file,event) => {
    setError("");
    setSelectedFile(file);
    // Create a preview URL for the selected image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      var image = new Image();
      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;
      //Validate the File Height and Width.
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        if (image.width < 1920 || image.height < 750) {
          setError('File resolution should be at least 1920x750 pixels');
          return false;
        }
        setPreviewImage(reader.result);
        return true;
      };
    };
  };

  useEffect(() => {
    getData();
  }, []);

  const handleName = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Banner text is required!");
    } else {
      setError("");
    }
    setName(val);
  };

  const filterBySize = (file) => {
    return file.size <= 1e+7;
    
};

  const handleClose = () => {
    setShow(false);
    setPreviewImage("");
  };
  const handleShow = () => {
    setShow(true)
  };

  const handleAdd = async (e) => {
    setId("");
    setName("");
    handleShow();
    setError("");
    setPreviewImage("");
  }

  const getData = async () => {
    props.application.setLoading(true);
    try {
      const res = await props.admin.getAllBanner();
      setData(res.banner);
      //console.log(JSON.stringify(res))
      props.application.setLoading(false);
    } catch (error) {
      props.application.setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (name === "") {
      setError("Banner text is required!");
      valid = false;
      return;
    } else {
      setError("");
    }
    if (!selectedFile){
      setError("Banner image is required!");
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
        if (id === "") {
          const data = new FormData();
          if (selectedFile) {
            data.append("name", name.trim());
            data.append("image", selectedFile);
          }
          else {
            setError("Please select Image for Banner!")
            props.application.setLoading(false);
            return;
          }
  
          const response = await props.admin.addBanner(data);
          if (response.data.success === true) {
            props.application.setLoading(false);
            toast.success("Banner added successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
            });
            props.application.setLoading(false);
          }
        } else {
          const data = new FormData();
          if (selectedFile) {
            data.append("image", selectedFile);
          }
          data.append("name", name.trim());
          const response = await props.admin.updateBanner(id, data);
          if (response.data.success === true) {
            props.application.setLoading(false);
            toast.success("Banner updated successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
            });
            props.application.setLoading(false);
          }
        }
        handleClose();
        setId("");
        setName("");
        getData();
        setPreviewImage("");
      } catch (err) {
        props.application.setLoading(false);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setId("");
        console.log(err);
      }
    }
  };

  const handleEdit = async (id) => {
    setSelectedFile("")
    const res = await props.admin.getBannerById(id);
    setId(id);
    setName(res.banner.name);
    handleShow();
    setPreviewImage(res.banner.image ? imagePath + res.banner.image : "");
  };
  
  const handleDelete = async (id) => {  
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this Banner?',
      showCancelButton: true,
      confirmButtonColor: "#3f6dcf",
      cancelButtonColor: "#373737",
      confirmButtonText: `Yes`, 
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          props.application.setLoading(true);
          const res = await props.admin.deleteBannerById(id);
          getData();
          props.application.setLoading(false);
          Swal.fire("Banner!", "Banner is deleted!", "success");
        } catch (err) {
          props.application.setLoading(false);
          console.log(err);
          Swal.fire("Banner!", "Something went wrong!", "error");
          return Promise.reject(err);
        }
      }
    });
  };

  return (
    <React.Fragment>
    <div className="pagetitle">
     <h1>Banners</h1>
     <nav>
       <ol className="breadcrumb">
       <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
            <li className="breadcrumb-item">Content Management</li>
         <li className="breadcrumb-item active">Banners</li>
       </ol>
     </nav>
   </div>
    <div className="verifier-buttton custom-button-colour">
     <Button onClick={handleAdd}>Add Banners</Button>{" "}
   </div>
     <Modal show={showModal} onHide={handleClose}>
     <Modal.Header closeButton className="modal-main-header">
       <Modal.Title>{id === "" ? 'Add' : 'Update'} Banner</Modal.Title>
     </Modal.Header>
     <Modal.Body>
          <form>
            <div className="searchformfld">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Banner text*"
                value={name}
                onChange={handleName}
                required
              />
              <div className="form-control mb-3">
              <div className="fw-bold">Upload banner image*  ({coverImageTypes.extensions.join(", ")})</div>
              {/* <div> ({coverImageTypes.extensions.join(", ")})</div> */}
                <input type="file" className="btn btn-primary mt-2 mb-2"
                  accept={coverImageTypes.mimeTypes.join(", ")}
                  //fileFilter={filterBySize}
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      const file = e.target.files[0];
                      if (coverImageTypes.mimeTypes.indexOf(file.type.toLowerCase()) !== -1) {
                        handleFileChange(file)
                      } else {
                        e.target.value = null;
                        toast.error(`Please choose ${coverImageTypes.extensions.join(", ")} files only`, {
                          position: toast.POSITION.TOP_CENTER,
                        })
                      }
                    }
                  }}
                />
                {previewImage && (
                  <div className="box_content asset-uploader">
                    <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
                  </div>
                )}
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <Button type="submit" variant="primary custom-button-colour" onClick={handleSubmit}>
                {id === "" ? 'Save Changes' : 'Update Changes'}
              </Button>
            </div>
          </form>
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
      <table id="banner" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Text</th>
            <th>Image</th>
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
                    <td><img
                      src={
                        item.image == null
                          ? "/assets/img/admin-panel-img.webp"
                          : imagePath + item.image
                      } alt="" className="userImage" />
                    </td>
                    <td>
                    {item.isActive === true? 'Active':'Deactive'}
                      {/* <ToggleButton value={item.isActive} /> */}
                    </td>
                    <td>
                      <div className="delete-create">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            handleEdit(item._id);
                          }} >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link
                          onClick={(e) => {
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
  )
}
export default injectModels(["admin", 'application'])(Banners);
