import React, { useState } from "react";
import { injectModels } from "../../Redux/injectModels";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function ResetPassword(props) {
  const { token } = useParams();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [npassword, setNPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

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

  const handlenpasswordChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("New Password is required");
      
    } else if (!passwordRegex.test(npassword)) {
      setError('New Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol and minimum length is 8!');
      
    } else {
      setError("");
    }
    setNPassword(val.trim());
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
    
    if (npassword.trim() === "") {
      setError("New Password is required!");
      valid = false;
      return;
    } else {
        if(!passwordRegex.test(npassword)) { 
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

    if (npassword.length < 8) {
      setError('New Password must be at least 8 characters long!');
      valid = false;
      return;
    }

    // Check if new password and confirm password match
    if (npassword != confirmPassword) {
      setError('New Password and Confirm Password did not match!');
      valid = false;
      return;
    }

    if (!valid) {
      toast.error("Please fill all the details!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      setError("")
      const data = {
        password: npassword,
        confirmPassword: confirmPassword,
        token: token
      }
      const res = await props.admin.resetPassword(data);

      try {
        props.application.setLoading(true);
        if (res.success === true) {
          props.application.setLoading(false);
          setSuccessMessage("Password changed successfully!");
          setError("")
        }
        else if (res.success === false) {
          props.application.setLoading(false);
          setError("Reset Password link is invalid or has been expired!");
          setSuccessMessage("")
        }
      }
      catch (err) {
        props.application.setLoading(false);
        setError("Somthing went wrong!")
        setSuccessMessage("")
      }
    }
  };


  return (
    <React.Fragment>
      <section className="login-page section register py-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-8  d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center pb-3">
               
              </div>
              <div className="card mb-3"><div className="card-body">
                <div className="pt-1 pb-3">
                  <h5 className="card-title text-center pb-0 fs-4">Change Password</h5>
                </div>
                <form className="row g-2 needs-validation account-login" onSubmit={handleSubmit}> 
                <div className="col-12">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <i className="fa-solid fa-lock"></i></span>
                      <input type={passwordType} className="form-control" name="password" id="password" placeholder="New Password*" 
                       onChange={handlenpasswordChange} maxLength={80} />

                      <button className="btn btn-outline-secondary eye-splash" onClick={togglePassword}>
                        {passwordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <i className="fa-solid fa-lock"></i></span>
                      <input type={confirmPasswordType} onChange={handleConfirmPasswordChange} id="confirmpassword" name="confirmpassword" maxLength={80} className="form-control" placeholder="Confirm Password*" />
                      <button className="btn btn-outline-secondary eye-splash" onClick={toggleConfirmPassword}>
                        {confirmPasswordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                      </button>
                    </div>
                  </div>
                  {successMessage && 
                            <div className="col-12">
                                <div className="alert alert-success">
                                    {successMessage}
                                </div>
                            </div>
                        }
                  {error && (
                    <div className="col-12">
                      <div className="alert alert-danger">{error}</div>
                    </div>
                  )}
                  {successMessage &&
                    <div className="col-12">
                      <div className="alert alert-success">
                        {successMessage}
                      </div>
                    </div>
                  }
                  <div className="col-12 login mt-3">
                    <button className="btn  w-100" type="submit" onClick={handleSubmit}>Change Password</button>
                  </div>
                </form>

              </div>
              </div>
              </div>
          </div>
          </div>
</section>
      {/* <div className="login-page">
        <div className="form">
          <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type={passwordType} onChange={handlenpasswordChange} name="password" maxLength={80} className="form-control" placeholder="New Password*" />
                <div className="input-group-btn">
                  <button className="btn btn-outline-primary reset-password-button custom-button-colour pass-icon" onClick={togglePassword}>
                    {passwordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                  </button>
                </div>

              </div>
             
              <div className="input-group">
                <input type={confirmPasswordType} onChange={handleConfirmPasswordChange} name="password" maxLength={80} className="form-control" placeholder="Confirm Password*" />
                <div className="input-group-btn">
                  <button className="btn btn-outline-primary reset-password-button custom-button-colour pass-icon" onClick={toggleConfirmPassword}>
                    {confirmPasswordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                  </button>
                </div>

              </div>
              


              {error && (
                <div className="col-xs-12 col-md-12 col-lg-12">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}
              {successMessage &&
                <div className="col-xs-12 col-md-12 col-lg-12">
                  <div className="alert alert-success">
                    {successMessage}
                  </div>
                </div>
              }
              <div className="row">
                <div className="center">
                  <button type="submit" className="btn btn-primary custom-button-colour" onClick={handleSubmit} >Change Password</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
}
export default injectModels(['admin', 'application'])(ResetPassword);
