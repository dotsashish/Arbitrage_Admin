import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Constants/routes";
import { injectModels } from "../../Redux/injectModels";
import { useParams } from "react-router-dom";

function Profile(props) {
    const {id} = useParams();
    const [data, setData] = useState({});
    const [profileRole, setProfileRole] = useState('');
    const role = localStorage.getItem("UserRole");

    const imagePath = `${process.env.REACT_APP_API_IMAGEPATH}/`;
    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
        if(id){
            props.application.setLoading(true);
            try {
                const res = await props.admin.getUserById(id);
                if(res.user){
                    setProfileRole(res.user.role);
                    setData(res.user);
                    props.application.setLoading(false);
                }
                else {
                props.application.setLoading(false);
                }
            } catch (error) {
                props.application.setLoading(false);
            }
        }
    };

  return (
      <React.Fragment>
          <div className="pagetitle">
              <h1>Profile</h1>
              <nav>
                  <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
                      <li className="breadcrumb-item active">Profile</li>
                  </ol>
              </nav>
          </div>
          <div className="page-content page-container" id="page-content">
              <div className="padding">
                  <div className="row d-flex justify-content-center"> 
                      <div className="col-xl-12 col-md-12 mt-0">
                     
                              <div className="row m-l-0 m-r-0">
                                  <div className="col-sm-4 bg-c-lite-green user-profile">
                                      <div className="card-block text-center text-white">
                                          <div className="m-b-25">
                                            <img
                                                src={data.image
                                                    ? `${imagePath}${data.image.toString()}`
                                                    : "/assets/img/default-image.png"
                                                   }
                                                   className="img-radius"
                                                   alt="" />
                                          </div>
                                          <h6 className="f-w-600 user-name-heading">{data.firstName}</h6>
                                          <p className="user-name-pargraph">{data.firstName} {data.lastName} </p>
                                          <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                                      </div>
                                  </div>
                                  <div className="col-sm-8">
                                      <div className="card user-card-full">
                                      
                                          <h6 className="user-information">
                                              Information{" "}
                                                {role==="admin" && profileRole!="user" ?
                                                <Link to={routes.EDITPROFILE} className="fa fa-pen-to-square" aria-hidden="true"></Link> : "" }
                                          </h6>
                                      
                                          <div className="row pd-ty">
                                              <div className="col-sm-6 mt-4 mb-4">
                                                  <p className=" f-w-600">Email</p>
                                                  <h6 className="text-muted f-w-400">
                                                      {data.email}
                                                  </h6>
                                              </div>
                                              <div className="col-sm-6 mt-4 mb-4">
                                                  <p className=" f-w-600">Name</p>
                                                  <h6 className="text-muted f-w-400">
                                                      {data.firstName +" "+ data.lastName}
                                                  </h6>
                                              </div>
                                          </div>
                                          <h6 className=" b-b-default f-w-600 user-information">
                                              Wallet
                                          </h6>
                                          <div className="row mt-4 pd-ty">
                                              <div className="col-sm-6 mb-4">
                                                  <p className=" f-w-600">Public Key</p>
                                                  <h6 className="text-muted f-w-400">{data.publicKey}</h6>
                                              </div>
                                          </div>
                                          <h6 className=" b-b-default f-w-600 user-information">
                                              User Role
                                          </h6>
                                          <div className="row mt-6 pd-ty">
                                              <div className="col-sm-7 mb-4">
                                                  <p className=" f-w-600">Roll</p>
                                                  <h6 className="text-muted f-w-400">{data.role}</h6>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          
      </React.Fragment>
  )
}
export default injectModels(["admin", 'application'])(Profile);