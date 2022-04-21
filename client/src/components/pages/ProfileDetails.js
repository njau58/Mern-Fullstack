import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ProfileDetails = (props) => {
  const [profile, setProfile] = useState({});
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

      if(!(localStorage.getItem('token'))){
        toast.error('Please login to perform this action.')
        navigate('/login')
      }
      async function getProfileById() {
        try {
          const response = await axios.get(`/api/view-single-profile/${_id}`,config);
          setProfile(response.data);
          setLoading(false);
        } catch (error) {
          let errorMessage
          if(error.response.status===404){
            errorMessage = "Profile not found."
            navigate('/view-profiles')
          }

          toast.error(errorMessage)
        }
      }
      getProfileById();
    },
    [_id,config]
  );
 function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/delete-profile/${_id}`,config)
          .then((result) => {
            Swal.fire("Deleted!", `Document has been deleted.`, "success");
            navigate('/');
          })
          .catch((error) =>{
            let errorMessage

            if(error.response.status===401){
              
              errorMessage = 'Not Authorized.You can only update a profile you created.'
              navigate('/view-profiles')
            }

            toast.error(errorMessage)

          });

     
      }
    });
  }

  if(loading){
    return  <Spinner/>
  }

  return (
    <div style={{marginTop:'-50px'}} className="container">
  <div>
        <h2>{profile.companyName}</h2>

        <p>
          <b>Phone</b>: <a href={`tel:+${profile.phone}`}> {profile.phone} </a>
        </p>

        <p>
          <b>Email</b>: {profile.email}
        </p>
        <p>
          <b>Location</b>: {profile.location}
        </p>
        <p>
          <b>Link</b> :
          <a href={` ${profile.link}`} target="_blank" rel="noreferrer">
            {profile.link}
          </a>
        </p>
        <p>
          <b>Description</b>: <p align="justify">{profile.description}</p>
          <b>Author</b>: <p align="justify">{profile.author}</p>
        </p>
        <p>
          <small>
            <b>ID</b>: {profile._id}
          </small>
        </p>
        <div className="btn-group ">
          <Link
            to={`/edit-company-profile/${profile._id}`}
            className="btn btn-primary"
          >
          
          <span class="glyphicon glyphicon-edit"></span>
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
          
          <span class="glyphicon glyphicon-remove"></span>
            Delete
          </button>
          <Link to="/view-profiles" className="btn btn-secondary">
            Close
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ProfileDetails;
