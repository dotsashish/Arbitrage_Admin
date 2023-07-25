import React, {useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectModels } from "../../Redux/injectModels";
import { Link } from "react-router-dom";
import { Routes } from '../../Constants';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let email = localStorage.getItem('RememberMeEmail');
    let password= localStorage.getItem('Password');
    const id = localStorage.getItem("UserId");
    if(email!=null&&password!=null){
      setEmail(email);
      setPassword(password);
    }
    if(id != null){
      navigate(Routes.DASHBOARD);
    }
    else {
      navigate(Routes.DEFAULT);
    }
  }, []);

  
//   useEffect(()=>{
//     if(props.auth.isLoggedIn){
//       navigate(Routes.DASHBOARD);
//     }
//  },[props.auth.isLoggedIn]);


  const handleEmailChange = (e) => {
    e.preventDefault();
    const val = e.target.value.trim();
    if (val === "") {
      setError("Email is required!");
    } else if (!emailRegex.test(val)) {
      setError("Please enter the correct Email!");
    } else {
      setError("");
    }
    setEmail(val);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Password is required!");
    } 
    else {
      setError("");
    }
    setPassword(val.trim());
  };

  const togglePassword =(e)=>{
    e.preventDefault();
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.application.setLoading(true, "Login!");

    let valid = true;

    if (password === "") {
      setError("Password is required!");
      valid = false;
    } else {
      setError("");
    }

    if (email.trim() === "") {
      setError("Email is required!");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter the correct Email!");
      valid = false;
    } else {
      setError("");
    }

    if (!valid) {
      props.application.setLoading(false, "");
      return;
    } else {
      const data = {
        email: email.trim(),
        password: password,
      };
      try {
        props.application.setLoading(true);
       // props.application.setLoading(false, "Login!");
        const res = await props.auth.userLogin(data); 
        localStorage.setItem("UserId", res.user._id);
        localStorage.setItem("UserFristName", res.user.firstName);
        localStorage.setItem("UserLastName", res.user.lastName);
        localStorage.setItem("UserRole", res.user.role);
        if (res.token) {
          if (res.user.role === "admin") {
            if (rememberMe) {
              localStorage.setItem("RememberMeEmail", email);
              localStorage.setItem("Password", password);
            } else {
              localStorage.removeItem("RememberMeEmail");
              localStorage.removeItem("Password");
            }
            navigate("/Home");
            toast.success("Logged in successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
            setError("");
          } else {
            props.application.setLoading(false);
            //props.application.setLoading(false, " Wait!");
            setError("Please enter the correct Email or Password!");
            localStorage.clear();
            return;
          }
          props.application.setLoading(false);
        } else {
          setError("Please enter the correct Email or Password!");
          props.application.setLoading(false);
        }
      } catch (err) {
        props.application.setLoading(false);
        console.log(err);
        setError(err.message);
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
                <a className="logo d-flex align-items-center w-auto" href="/">
                  <img src={`assets/img/arbitrage.svg`} alt="" /></a>
              </div>
              <div className="card mb-3"><div className="card-body">
                <div className="pt-1 pb-3"><h5 className="card-title text-center pb-0 fs-4">Admin Login</h5>
                </div>
                <form className="row g-2 needs-validation account-login" onSubmit={handleSubmit}> 
                  <div className="col-12">
                    <label htmlFor="yourUsername" className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend"><i className="fa-regular fa-envelope"></i> </span>
                      <input type="text" name="username" className="form-control" id="yourUsername"  placeholder="Email*"
                        autoComplete="off" value={email} onChange={handleEmailChange} />
                      <div className="invalid-feedback">Please enter your Email ID.</div></div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">Password</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <i className="fa-solid fa-lock"></i></span>
                      <input type={passwordType} className="form-control" name="password" id="password" placeholder="Password*" value={password} onChange={handlePasswordChange} />

                      <button className="btn btn-outline-secondary eye-splash" onClick={togglePassword}>
                        {passwordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                      </button>

                      <div className="invalid-feedback">Please enter your Password.</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="remMe">
                      <div className="form-check"></div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="rememberMe" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} />
                        <label className="form-check-label" htmlFor="rememberMe">Remember Me </label>
                      </div>
                    </div>
                  </div>
                    {error && (
                      <div className="col-12">
                        <div className="alert alert-danger">{error}</div>
                      </div>
                    )}
                    <div className="col-12 login">
                    <button className="btn  w-100" type="submit">Login</button></div>
                  <div className="col-12 text-center create-account">
                    <p className="small mb-0">Forgot your password? 
                      <Link to={Routes.FORGOTPASSWORD} className="ac-new"> <span>Click here to reset it</span></Link>
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
      
        <div className="hanglogin">
          <div className="form">
            <img src={`assets/img/logo.png`} alt="Avatar" />
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email*"
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="password-icon">
                <input
                  type={passwordType}
                  placeholder="Password*"
                  autoComplete="off"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="login-input-group-btn">
                  <button className="btn btn-outline-primary custom-button-colour" onClick={togglePassword}>
                    {passwordType === "password" ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                  </button>
                </div>
              </div>
              {error && (
                <div className="col-xs-12 col-md-12 col-lg-12">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}

              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              
              <button className="hanglogin1" type="submit">
                Login
              </button>
            </form>
            <p className="message">
              Forgot your password?
              <Link to={Routes.FORGOTPASSWORD}> <span>Click here to reset it</span></Link>
            </p>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
}
export default injectModels(["application",'auth'])(Login);
