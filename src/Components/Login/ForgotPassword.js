import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { injectModels } from "../../Redux/injectModels";
import { toast } from "react-toastify";
import { AuthService } from "../Services";
import { Link } from "react-router-dom";
import { Routes } from '../../Constants';

function ForgotPassword(props) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => {
    e.preventDefault();
    const val = e.target.value.trim();
    if (val === "") {
      setError("Email is required");
    } else if (!emailRegex.test(val)) {
      setError("Please enter the correct Email!");
    } else {
      setError("");
    }

    setEmail(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.application.setLoading(true, "Please wait!");
    let valid = true;
    if (email.trim() === "") {
      setError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter the correct Email");
      valid = false;
    } else {
      setError("");
    }
    if (!valid) {
      props.application.setLoading(false, "Please wait!");
      return;
    } else {
      setError("");
      AuthService.ForgotPassword({ email: email })
        .then((response) => {
          props.application.setLoading(false, "Please wait!");
          if (response.success === true) {
            setSuccessMessage(response.message);
            toast.success(response.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            setError(response.message);
          }
        })
        .catch((error) => {
          props.application.setLoading(false, "Please wait!");
          console.log(error);
          setError(error.response.data.message);
          setSuccessMessage("")
        });
    }
  };
  return (
    <React.Fragment>

<section className="login-page section register py-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-8  d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center pb-3">
                {/* <a className="logo d-flex align-items-center w-auto" href="/">
                  <img src="/assets/img/logo.png" alt="" /></a> */}
              </div>
              <div className="card mb-3"><div className="card-body">
                <div className="pt-1 pb-0">
                  <h5 className="card-title text-center pb-0 fs-4">Forgot Password</h5>
                  <p className="pt-2 pb-0"> 
                    You forgot your password? Here you can easily retrieve a new
                    password.
                  </p>
                </div>
                <form className="row g-2 needs-validation account-login" onSubmit={handleSubmit}> 
                  <div className="col-12"><label htmlFor="yourUsername" className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend"><i className="fa-regular fa-envelope"></i> </span>
                      <input type="text" name="username" className="form-control" id="yourUsername"  placeholder="Email*"
                        autoComplete="off" onChange={handleEmailChange} />
                      <div className="invalid-feedback">Please enter your Email ID.</div></div>
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
                  <div className="col-12 login">
                    <button className="btn  w-100" type="submit">Request new password</button>
                  </div>
                  <div className="col-12 text-center create-account">
                    <p className="small mb-0">
                    {/* <a className="ac-new" onClick={() => navigate("/")}>Login</a> */}
                    <Link to={Routes.DEFAULT} className="ac-new"> <span>Login</span></Link>
                      {/* <Link to={Routes.FORGOTPASSWORD} className="ac-new"> <span>Click here to reset it</span></Link> */}
                      {/* <a href="javscript" className="ac-new">Click here to reset it</a> */}
                    </p>
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
            <h2>Forgot Password</h2>
            <p>
              You forgot your password? Here you can easily retrieve a new
              password.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email*"
                onChange={handleEmailChange}
              />

             

              {successMessage && 
                            <div className="col-xs-12 col-md-12 col-lg-12 mt-3">
                                <div className="alert alert-success">
                                    {successMessage}
                                </div>
                            </div>
                        }
              {error && (
                <div className="col-xs-12 col-md-12 col-lg-12">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}

              <button className="hanglogin1 mt-3 mb-1">
                Request new password
              </button>
            </form>
            <p className="float-start message">
              <a onClick={() => navigate("/")}>Login</a>
            </p>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
}
export default injectModels(["application"])(ForgotPassword);
