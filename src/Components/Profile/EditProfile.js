import React, { useEffect, useState } from "react";
import CropImage from "../Cropper";
import { Link } from "react-router-dom";
import { routes } from "../../Constants/routes";
import { toast } from "react-toastify";
import MyLoader from "../Loader/Loader";
import { useLocation } from 'react-router-dom';
import { injectModels } from "../../Redux/injectModels";
import { coverImageTypes } from "../../Constants";
import { useNavigate } from 'react-router-dom';

function EditProfile(props) {
  let navigate = useNavigate();
  const [loader, setLoader] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [image, setImage] = useState(null);
  const [avtarModelOpen, setAvtarModelOpen] = useState(false);
  const avatarFileRef = React.useRef();
  const [imageLoading, setImageLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const [Blob, setBlob] = useState();
  const [profileImage, setProfileImage] = useState("");
  const imagePath = `${process.env.REACT_APP_API_IMAGEPATH}/`;

  const id = localStorage.getItem("UserId");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      if (id) {
        props.application.setLoading(true);
        try {
          const res = await props.admin.getUserById(id);
          if (res.user) {
            //setData(res.user);
            setProfileImage(res.user.image ? imagePath + res.user.image : "");
            setFirstName(res.user.firstName)
            setLastName(res.user.lastName)
            setBio(res.user.bio)
            setContactNumber(res.user.number)
            props.application.setLoading(false);
          }
          else {
            props.application.setLoading(false);
          }
        } catch (error) {
          props.application.setLoading(false);
        }
      }
      else {
        props.application.setLoading(false);
        toast.error("You are not loggedin!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      props.application.setLoading(false);
      toast.error("Somthing went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };


  const handelAvtarFile = (value, event) => {
    if (value) {
      //handling image file
      setImage(value);
      setAvtarModelOpen(true);
    }
  };

  const handleFirstName = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("First name is required!");
    } else {
      setError("");
    }
    setFirstName(val);
  };

  const handleLastName = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("Last name is required!");
    } else {
      setError("");
    }
    setLastName(val);
  };

  // const handleBio = (e) => {
  //   e.preventDefault();
  //   const val = e.target.value;
  //   // if (val.trim() === "") {
  //   //   setError("You need to add user Bio!");
  //   // } else {
  //   //   setError("");
  //   // }
  //   setBio(val);
  // };

  // const handleContact = (e) => {
  //   e.preventDefault();
  //   const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  //   if (value.length <= 10) {
  //     setContactNumber(value);
  //   }
  //   else {
  //     setError("Phone number must be 10 digits!");
  //   }
  // };

  const getCroppedImageAvtar = async (blob) => {
    if (blob) {
      try {
        setBlob(blob);
        setImageLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
          const base64data = reader.result;
          setProfileImage(base64data);
          setImageLoading(false);
        };
        reader.onerror = function (error) {
          console.log(error);
          setImageLoading(false);
          toast.error("something went wrong while reading the file", {
            position: toast.POSITION.TOP_CENTER,
          });
        };
      } catch (error) {
        console.log(error);
        setImageLoading(false);
        toast.error("something went wrong while uploading the file", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault();
    //setLoader(true);
    props.application.setLoading(true);
    try {
      //const id = localStorage.getItem("UserId");
      const data = new FormData();
      data.append("firstName", firstname.trim());
      data.append("lastName", lastname.trim());
      // data.append("bio", bio.trim());
      // data.append("number", contactnumber ?? "");
      data.append("image", Blob);
      const res = await props.admin.updateProfile(id, data);
      if (res.data.success === true) {
        props.application.setLoading(false);
        //setLoader(false);
        toast.success("Profile updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        // navigate('/profile');
        navigate(`/profile/${res.data.user._id}`);
      }
      else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
        props.application.setLoading(false);
        //setLoader(false);
      }
    } catch (error) {
      console.log(error);
      props.application.setLoading(false);
      toast.error("Could not update details", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const redirectProfileHandle = (e) => {
    e.preventDefault();
    navigate(`/profile/${id}`);
  };

  return (
    <React.Fragment>
      <div className="profile-icon-ty">
        <div className="pagetitle">
          <h1>Edit Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
              <li className="breadcrumb-item active">Edit Profile</li>
            </ol>
          </nav>
        </div>
        <div className="icon-menu">
          <Link className="fa fa-arrow-left" aria-hidden="true" onClick={redirectProfileHandle}> </Link> <span>Back</span>
        </div>
      </div>

      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row  d-flex justify-content-center">
            <div className="col-xl-12 col-md-12 mt-1">
              <div className="">
                <div className="row m-l-0 m-r-0">
                  <div className="col-md-6 col-sm-12 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <input hidden ref={avatarFileRef} type="file" name="profileImage"
                          accept={coverImageTypes.mimeTypes.join(", ")}
                          onChange={(e) => {
                            if (e.target.files.length > 0) {
                              const file = e.target.files[0];
                              if (coverImageTypes.mimeTypes.indexOf(file.type.toLowerCase()) !== -1) {
                                handelAvtarFile(file)
                              } else {
                                e.target.value = null;
                                toast.error(`Please choose ${coverImageTypes.extensions.join(", ")} files only`, {
                                  position: toast.POSITION.TOP_CENTER,
                                })
                              }
                            }
                          }}
                        />
                        <div className="box_content asset-uploader mb-3" onClick={(e) => {
                          e.preventDefault(); avatarFileRef.current.click();
                        }}>
                          <img className="img-radius"
                            src={profileImage} alt="" />
                          <button> Upload Image </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="card user-card-full ter p-5">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="firstname" className="form-label">Name*</label>
                          <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            className="form-control"
                            value={firstname}
                            onChange={handleFirstName}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lastname" className="form-label">Last Name*</label>
                          <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            className="form-control"
                            value={lastname}
                            onChange={handleLastName}
                          />
                        </div>
                        {/* <div className="mb-3">
                          <label htmlFor="contact" className="form-label">Contact Number</label>
                          <input
                            id="contact"
                            name="contact"
                            type="tel"
                            className="form-control"
                            // value={contactnumber}
                            value={contactnumber !== null ? contactnumber : ''}
                            onChange={handleContact}
                            maxLength="10"
                            pattern="\d{10}"
                          />
                        </div> */}
                        {/* <div className="mb-3">
                          <label htmlFor="bio" className="form-label">Bio</label>
                          <input
                            id="bio"
                            name="bio"
                            type="text"
                            className="form-control"
                            // value={bio}
                            value={bio ? bio : ""}
                            onChange={handleBio}
                          />
                        </div> */}
                        <div className="btn-sbm">
                        <button type="submit" className="btn btn-primary custom-button-colour" onClick={(e) => updateProfile(e)} >
                          Submit
                          {loader === true ? <MyLoader /> : ""}
                        </button>
                        </div>
                      </form>
                      {error && (
                        <div className="col-xs-12 col-md-12 col-lg-12">
                          <div className="alert alert-danger">{error}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CropImage isOpen={avtarModelOpen} file={image} getCroppedImage={getCroppedImageAvtar} aspectRatio={1} />
    </React.Fragment>
  )
}

export default injectModels(["admin", 'application'])(EditProfile);

