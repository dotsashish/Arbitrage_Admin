import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { injectModels } from "../../Redux/injectModels";
import { Link } from "react-router-dom";
import { routes } from "../../Constants/routes";

// Check if new password contains at least one uppercase letter, lowercase letter, number, and symbol
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function ChangePassword(props) {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShow] = useState(false);
  const [error, setError] = useState("");


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [oldPasswordType, setOldPasswordType] = useState("password");

  const toggleOldPassword = (e) => {
    e.preventDefault();
    if (oldPasswordType === "password") {
      setOldPasswordType("text")
      return;
    }
    setOldPasswordType("password")
  }

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text")
      return;
    }
    setConfirmPasswordType("password")
  }


  useEffect(() => {
    handleShow();
  }, []);

  const handleOldPasswordChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Old Password is required!");
    } else {
      setError("");
    }
    setOldPassword(val.trim());
  };

  const handleNewPasswordChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("New Password is required");
    } else if (!passwordRegex.test(newPassword)) {
      setError('New Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol and minimum length is 8!');
    } else {
      setError("");
    }
    setNewPassword(val.trim());
  };


  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Confirm Password is required!");
    } else {
      setError("");
    }
    setConfirmPassword(val.trim());
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (oldPassword.trim() === "") {
      setError("Old Password is required!");
      valid = false;
      return;
    } else {
      setError("");
    }
    if (newPassword.trim() === "") {
      setError("New Password is required!");
      valid = false;
      return;
    } else {
      if (!passwordRegex.test(newPassword)) {
        setError('New Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol and minimum length is 8!');
        return;
      }
      setError("");
    }
    if (confirmPassword.trim() === "") {
      setError("Confirm Password is required!");
      valid = false;
      return;
    } else {
      setError("");
    }

    if (oldPassword.trim() === newPassword.trim()) {
      setError("You are not allowed to use an Old Password!");
      return;
    }

    // Check if old password is valid
    // if (oldPassword !== '123456') {
    //   setError('Old password is incorrect.');
    //   valid = false;
    //   return;
    // }

    // Check if new password is at least 8 characters long
    if (newPassword.length < 8) {
      setError('New Password must be at least 8 characters long!');
      valid = false;
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError('New Password and Confirm Password do not match!');
      valid = false;
      return;
    }

    if (!valid) {
      setError("Please fill all fields!");
      return;
    } else {
      setError("");
      try {
        const data = {
          oldPassword: oldPassword,
          newPassword: newPassword.trim()
        };
        const response = await props.admin.changePassword(data);
        if (response.data.success === true) {
          props.application.setLoading(false);
          toast.success("Password updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
          handleClose()
        }
        // else if(response.data.success === false){
        //   props.application.setLoading(false);
        //   toast.success("Invalid old Password!", {
        //     position: toast.POSITION.TOP_CENTER,
        //   });
        //   handleClose()
        // }
        else {
          toast.error(`${response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
          props.application.setLoading(false);
          //handleClose()
        }
      } catch (err) {
        props.application.setLoading(false);
        toast.error(`${err.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        //handleClose()
      }
    }
  };

  return (
    <React.Fragment>
      <div className="pagetitle">
        <h1>Change Password</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
            <li className="breadcrumb-item active">Change Password</li>
          </ol>
        </nav>
      </div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row  d-flex justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-6  mt-1">
            
                  <div className="card user-card-full ter for">
                    <form>
                      <label htmlFor="yourUsername" className="form-label">Old Password</label>
                      <div className="input-group change-pass">
                        <input type={oldPasswordType} onChange={handleOldPasswordChange} name="password" maxLength={80} className="form-control mb-3" placeholder="Old Password*" />
                        <div className="input-group-btn">
                          <button className="btn btn-outline-primary custom-button-colour" onClick={toggleOldPassword}>
                            {oldPasswordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                          </button>
                        </div>
                      </div>

                      <label htmlFor="yourUsername" className="form-label">New Password</label>
                      <div className="input-group change-pass">
                        <input type={passwordType} onChange={handleNewPasswordChange} name="password" maxLength={80} className="form-control mb-3 " placeholder="New Password*" />
                        <div className="input-group-btn">
                          <button className="btn btn-outline-primary custom-button-colour" onClick={togglePassword}>
                            {passwordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                          </button>
                        </div>
                      </div>

                      <label htmlFor="yourUsername" className="form-label">Confirm Password</label>
                      <div className="input-group change-pass">
                        <input type={confirmPasswordType} onChange={handleConfirmPasswordChange} name="password" maxLength={80} className="form-control mb-3" placeholder="Confirm Password*" />
                        <div className="input-group-btn">
                          <button className="btn btn-outline-primary custom-button-colour" onClick={toggleConfirmPassword}>
                            {confirmPasswordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                          </button>
                        </div>
                      </div>

                      <div className="btn-sbm">
                        <button type="submit" className="btn btn-primary custom-button-colour" onClick={handleSubmit}>Submit</button>
                      </div>
                    </form>
                    {error && (
                      <div className="col-xs-12 col-md-12 col-lg-12 mt-1">
                        <div className="alert alert-danger">{error}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
       

    </React.Fragment>
  )
}
export default injectModels(["admin", 'application'])(ChangePassword);
