import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate,} from 'react-router-dom'
import {toast } from 'react-toastify';
import { registerInitiate } from "../../Redux/auth/authActions";
import FileBase64 from 'react-file-base64';




const SignUp = () => {

  const initialState = {
    name:'',
    email:'',
    password:'',
    img:''
  }
  const [user, setUser] = useState(initialState)
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownR, setPasswordShownR] = useState(false);
  const [passwordR, setPasswordR] = useState('');
  const navigate = useNavigate()
   const dispatch = useDispatch();
   const token  = useSelector((state) => state.user.token);
   const error  = useSelector((state) => state.user.error);
   const loading  = useSelector((state) => state.user.loading);
  
  

useEffect(()=>{

if(error){
  let errorMessage
  if(error.response.status===409){
   errorMessage='User already exist.'
  }
  if(error.response.status===422){
   errorMessage='Invalid user data.'
  }
  if(error.response.status===204){
   errorMessage='Please fill all fields.'
  }
  if(error.response.status===413){
   errorMessage='The file is too big.Choose files below 60KB'
  }

  toast.error(errorMessage)

}
if(token){
  
  navigate('/')
}


  
},[token,error, navigate,dispatch])

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePasswordR = () => {
    setPasswordShownR(!passwordShownR);


  };

const handleOnChange = (event) =>{
  setUser({...user,[event.target.name]:event.target.value })
}



  const handleSubmit = (event) =>{
    event.preventDefault()

    if(passwordR !==user.password){
      toast.error(' Password do not match.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    else{
    dispatch(registerInitiate(user))

    }


  }

  // if(loading){
  //   return <Spinner/>
  // }

 

  return (
    <div
      className="container overflow-auto"
      style={{marginTop:'-60px', maxWidth: "700px", OverflowY: "scroll" }}
    >
      <h3>SignUp</h3>
      <hr />
      <div
        className="formContainer"
        style={{
          border: "solid 1px #eee",
          borderRadius: "4px",
          boxShadow:' 0 0 30px #ccc',
          padding: "18px",
        }}
      >
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              required
              className="form-control"
              onChange={handleOnChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="text"
              required
              onChange={handleOnChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <input
                name="password"
                type={passwordShown ? "text" : "password"}
                required
                onChange={handleOnChange}
                className="form-control"
              />
              <span onClick={togglePassword} className="input-group-addon">
                {passwordShown ? (
                  <i className="glyphicon glyphicon-eye-open"></i>
                ) : (
                  <i className="glyphicon glyphicon-eye-close"></i>
                )}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <div className="input-group">
              <input
                name="repeat"
                type={passwordShownR ? "text" : "password"}
                required
                className="form-control"
                onChange={event=>setPasswordR(event.target.value)}
              />
              <span onClick={togglePasswordR} className="input-group-addon">
                {passwordShownR ? (
                  <i className="glyphicon glyphicon-eye-open"></i>
                ) : (
                  <i className="glyphicon glyphicon-eye-close"></i>
                )}
              </span>
            </div>
            <div style={{margin:'10px'}} className="form-group">
              <label >Upload profile image(optional)</label>
              <FileBase64
type="file"
multiple={false}
onDone={({ base64 }) => setUser({ ...user, img: base64 })}

/>
            </div>

          </div>

          <div style={{ width:"100%", display: "flex", justifyContent: "center" }}>

            <input   style={{width:"90%",marginBottom:'20px',outline:'none'}}  type="submit" value={loading?"Loading...":"SignUP"}  className={`btn + ${loading?'disabled' :null} + btn-primary`} />
          </div>

        </form>
      </div>
  

    </div>
  );
};

export default SignUp;
