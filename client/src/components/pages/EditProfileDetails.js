import React, { useState, useEffect } from "react";
import { get, post } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";

function EditProfileDetails(props) {
  const initialState = {
    companyName: "",
    phone: "",
    email: "",
    location: "",
    link: "",
    description: "",
  };
  const [profile, setProfile] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const { _id } = useParams();
  const navigate = useNavigate();
  const config={
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }

  useEffect(
    function () {
      get(`/api/view-single-profile/${_id}`,config)
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch(error=>{

          console.log(error)
          let errorMessage
          if(error.response.status===404){
            errorMessage = "Profile not found."
          }
          if(error.response.status===422){
            errorMessage = "Provide an ID."
          }

          toast.error(errorMessage)
          navigate('/view-profiles')
        });
    },
    [_id,navigate]
  );

  function handleSubmit(event) {
    event.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        post(`/api/edit-company-profile/${profile._id}`, profile,config)
          .then((response) => {
            navigate(`/view-single-profile/${profile._id}`,config);
            Swal.fire("Profile updated successfully.", "", "success");
            
          })
          .catch((error) => {
            let errorMessage

            if(error.response.status===409){
              
              errorMessage = 'Another profile such a you create already exist'
            }
            if(error.response.status===401){
              
              errorMessage = 'Not Authorized.You can only update a profile you created.'
              navigate(`/view-single-profile/${profile._id}`,config)
            }

            toast.error(errorMessage)
          }
         );

      
      } else if (result.isDenied) {
        Swal.fire("Changes were not saved", "", "info");
      }
    });
  }

const handleChange=(event)=> {
  setProfile({ ...profile, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate(`/view-single-profile/${profile._id}`);
  }

  return (
    <div
      className="container overflow-auto"
      style={{marginTop:'-100px', maxWidth: "350px"}}
    >
      
    
     {loading?<div style={{ position:'relative', left:'50%'}}><Rings color="#00BFFF" height={80} width={80} /></div>:
		<div
        className="formContainer"
        style={{
          border: "solid 1px #eee",
          borderRadius: "4px",
          padding: "18px",
        }}
      >
        <form onSubmit={handleSubmit}>
        <h2
        style={
              {
                marginBottom:'20px'
              }
            }>Update Profile</h2>
          <div class="row">
            <div class="col-xs-5">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  required
                  value={profile.companyName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div class="col-xs-7">
              {" "}
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  pattern="(254)[0-9]{3}[0-9]{6}"
                  required
                  value={profile.phone}
                  onChange={handleChange}
                  className="form-control"
                />
                <small>Format: 254XXXXXXXXX</small>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-5">
              {" "}
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                  required
                  value={profile.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div class="col-xs-7">
              <div className="form-group">
                <label>Location</label>
                <input
                  name="location"
                  type="text"
                  required
                  value={profile.location}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              name="link"
              type="url"
              value={profile.link}
              onChange={handleChange}
              className="form-control"
            />
            <small>Format: https://yourlink.ext</small>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              row="10"
              value={profile.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input type="submit" value="Update" className="btn btn-primary" />

            <button type="button" onClick={handleCancel} class="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>}
    </div>
  );
}

export default EditProfileDetails;
