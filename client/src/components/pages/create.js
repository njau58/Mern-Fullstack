import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import{post } from "axios";
import Swal from "sweetalert2";
import {toast} from 'react-toastify'

function Create() {
  const initialState = {
    companyName: "",
    phone: "",
    email: "",
    location: "",
    link: "",
    description: "",
    category:"IT"
  };
  const [profile, setProfile] = useState(initialState);

  console.log(profile)

  const navigate = useNavigate();
  const config={
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
 
    post("/api/create-company-profile/", profile,config)
    .then( response=>{


      console.log(response.data)

      Swal.fire({
     
        icon: 'success',
        title: 'Profile created Successfully!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout((

      )=>{    navigate(`/view-single-profile/${response.data._id}`,config);},2500)
  
    })

    
    
    .catch(error => {
      console.log(error)
      let errorMessage
      if(error.response.status ===409){
        errorMessage = 'Profile already exist.'
      }
      if(error.response.status ===422){
        errorMessage = 'Please fill out all the fields.'
      }

      toast.error(errorMessage)
  
    }
	)
  

  
    
  }

  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate("/view-profiles");
  }

  return (
    <div className="container overflow-auto" style={{marginTop:'-90px', maxWidth: "350px",   }}>
    
     
	<div className="formContainer" style={{ boxShadow:'  0 2px 2px 0 #ccc', border:'solid 1px #eee',borderRadius:'4px', padding:'18px'}}>
      <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom:'20px'}}>Create Profile</h2>
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
          <div class="col-xs-5">
            <div className="form-group">
              <label>Category</label>
              <select  onChange={e=>setProfile({...profile,category:e.target.value})} className="form-select form-select-lg mb-3  ">
  <option value="IT" selected>IT </option>
  <option value="BuildingConstruction">Building&Construction</option>
  <option value="GeneralConsultancy">General Consultancy</option>
  <option value="HotelHospitality">Hotel&Hospitality</option>
  <option value="Software">Software</option>
  <option value="GeneralSupplies">General Supplies</option>
  <option value="Pharmacy">Pharmaceutical</option>
</select>
            
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
	  <div class="col-xs-5">  <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
            required
            value={profile.email}
            onChange={handleChange}
            className="form-control"
          />
        </div></div>
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
        </div></div>
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
		<input type="submit" value="Submit" className="btn btn-primary" />
      
          <button type="button" 	onClick={handleCancel}  class="btn btn-danger">
            Cancel
          </button>
        </div>
      </form>
	  </div>
    </div>
  );
}

export default Create;
