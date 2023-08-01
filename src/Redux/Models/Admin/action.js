import axios from "axios";
import * as CONSTANTS from "./constants";

// API integration for all request and responce for AboutUs
export const getAllAboutUs = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllAbout`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAboutUsById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/aboutSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addAboutUs = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/aboutCreate/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.ABOUT_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updateAboutUs = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/aboutSingleGet/${data.id}`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });

     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.ABOUT_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.ABOUT_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deleteAboutUsById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/aboutSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for AboutUs
export const getAllPlateform = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllplatform`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPlateformById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/platformSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addPlateform = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/platformCreate/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.ABOUT_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updatePlateform = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/platformSingleGet/${data.id}`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });

     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.ABOUT_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.ABOUT_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deletePlateformById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/platformSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for Privacy Policy
export const getAllPrivacyPolicy = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/privacyAll`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPrivacyPolicyById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacy/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addPrivacyPolicy = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/privacyCreate/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.PRIVACY_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updatePrivacyPolicy = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/privacy/${data.id}`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });

     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.PRIVACY_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.PRIVACY_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deletePrivacyPolicyById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/privacy/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for Terms
export const getAllTerm = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllterm`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTermById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/termSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        }
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addTerm = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/termCreate/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.TERM_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updateTerm = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/termSingleGet/${data.id}`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });

     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.TERM_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.TERM_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deleteTermById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/termSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for Partner
export const getAllBanner = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllbanner`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBannerById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/bannerSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );
      console.log(response)
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addBanner = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/bannerCreate/`,data,
      {
          headers:
          {
              "Content-Type": "multipart/form-data", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
      dispatch({ type: CONSTANTS.PARTNER_POST, payload: data });
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.PARTNER_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updateBanner = (id,data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
     
    if (!id) {
      throw new Error('Partner id is undefined or null');
    }

    const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/bannerSingleGet/${id}`,data,
    {
        headers:
        {
          "Content-Type": "multipart/form-data",  
          "Authorization": `Bearer ${accessToken}` 
        }
    });
    
     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.LEGAL_UPDATE, payload: data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.LEGAL_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deleteBannerById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/bannerSingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for Partner
export const getAllNotification = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllNotification`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNotificationById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/getNotification/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addNotification = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/CreateNotification/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
      dispatch({ type: CONSTANTS.NOTIFICATION_POST, payload: data });
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.NOTIFICATION_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updateNotification = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
     
    if (!data.id) {
      throw new Error('Notification id is undefined or null');
    }
    const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/getNotification/${data.id}`,data,
    {
        headers:
        {
          "Content-Type": "application/json",  
          "Authorization": `Bearer ${accessToken}` 
        }
    });
    
     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.NOTIFICATION_UPDATE, payload: data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.NOTIFICATION_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deleteNotificationById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/getNotification/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for Contact
export const getAllContact = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllContact`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API integration for all request and responce for Users
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllUser`
      , 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// API for User block and unblock
export const blockUnblockUser = (data) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/blockUnblockUser/${data.id}`,data,
    {
      headers:
       {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${accessToken}` 
      } 
    }
    );
    if (response && response.status === 200 && response.data) {
      dispatch({type:CONSTANTS.USER_UPDATE, payload:response.data});
      return response.data;
    }
    else 
    {
        dispatch({type:CONSTANTS.USER_FAILLED, payload:null});
         return Promise.reject(new Error(response.message)); 
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/getUserById/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUserId = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/userData/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/updateProfile/${id}`,data,
      {
          headers:
          {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${accessToken}` 
          }
      });

     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.USER_PROFILEUPDATE, payload:response.data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.USER_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}
//End 

// API integration for all request and responce for Chnage Password

export const changePassword = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/changePassword/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });
     if(response && response.status === 200 && response.data) {
         dispatch({type:CONSTANTS.PASSWORD_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
         dispatch({type:CONSTANTS.PASSWORD_FAILED, payload:null});
          return Promise.reject(new Error(response.data.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const resetPassword = (data) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/password/reset/${data.token}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200 && response.data) {
      dispatch({ type: CONSTANTS.PASSWORD_UPDATE, payload: response.data });
      return response.data;
    } else {
      dispatch({ type: CONSTANTS.PASSWORD_FAILED, payload: null });
      return {success: false};
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: CONSTANTS.PASSWORD_FAILED, payload: null });
    return Promise.reject(error);
  }
};

export const resetPassword1 = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/password/reset/${data.token}`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });
     if(response && response.status === 200 && response.data) {
         dispatch({type:CONSTANTS.PASSWORD_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
         dispatch({type:CONSTANTS.PASSWORD_FAILED, payload:null});
          return Promise.reject(new Error(response.data)); 
     }

  } catch(error) {
      console.log(error);
  }
}

//End



// API integration for Dashboard data
export const getDashboardData = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/dashboard`
      , 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}; 

export const getMasterLookupData = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/MasterLookup`
      , 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getReportLookupData = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/reportLookup`
      , 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const ReportAction = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/ReportAction/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
      dispatch({ type: CONSTANTS.REPORT_POST, payload: data });
         return response;
     } 
     else
     {
          dispatch({type:CONSTANTS.REPORT_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

// API integration for all request and responce for Trade Currency
export const getAllCurrency = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/getAllCurrency`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCurrencyById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/currencySingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCurrency = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/currencyCreate/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.CURRENCY_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const updateCurrency = (data) => async (dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/currencySingleGet/${data.id}`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          }
      });

     if(response && response.status === 200 && response.data) {
          dispatch({type:CONSTANTS.CURRENCY_UPDATE, payload:response.data});
         return response;
     }
     else 
     {
          dispatch({type:CONSTANTS.CURRENCY_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}

export const deleteCurrencyById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/currencySingleGet/${id}`, 
      {
        headers:
         {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${accessToken}` 
        } 
      }
    );

    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//End

// API for lof Trade fee update
export const tradeFeeLog = (data) => async(dispatch, getState) => {
  try
  {
      const accessToken = getState().auth.accessToken;
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/tradeFeeLog/`,data,
      {
          headers:
          {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${accessToken}` 
          } 
      });
     if(response && response.status === 200 && response.data) {
         return response;
     } 
     else 
     {
          dispatch({type:CONSTANTS.PRIVACY_FAILLED, payload:null});
          return Promise.reject(new Error(response.message)); 
     }

  } catch(error) {
      console.log(error);
  }
}
//END


