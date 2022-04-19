import React ,{useState}from "react";
import "./Dashboard.css";
import logo from "../../assets/images/logo.png";
import { NavLink,useNavigate } from "react-router-dom";
import{useSelector,useDispatch} from 'react-redux'
import { logoutInitiate } from "../../Redux/auth/authActions";


const Dashboard = () => {

 


const auth  = useSelector((state) => state.user.token);

const dispatch = useDispatch()
const navigate = useNavigate()
// const currentUser = 







const onLogout = () => {
  dispatch(logoutInitiate())

 navigate('/')
}


  return (
    <>
      <div className="Nav">
        <div className="left">
          <NavLink to="/" >
            {" "}
            <img src={logo} alt="logo"></img>
          </NavLink>
        </div>
        <div className="center">
        {auth?   <div style={{ display: "flex", justifyContent: "space-between" }}>

       
<NavLink to='/view-profiles'><p style={{marginRight:'10px'}}><small>Profiles</small></p></NavLink>
<NavLink to='/my-account'><p style={{marginRight:'10px'}}><small>Account</small></p></NavLink></div>:null}
     

        </div>
        <div className="right">
        

             {auth?
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{}}>Welcome,<p style={{fontWeight:'bold',fontSize:'0.8rem',marginRight:'40px',marginTop:'2px'}}>{JSON.parse(localStorage.getItem('currentUser')).name}</p></p>

             <button onClick={onLogout} style={{border:'none', background:'white',marginRight:'22px',marginBottom:'15px'}}>
              <p>
                Logout
                <span
                  style={{ margin: "5px" }}
                  className="glyphicon glyphicon-log-out"
                ></span>
              </p>{" "}
            </button></div>:
          <div style={{ display: "flex", justifyContent: "space-between" }}>
     
            <NavLink to="/login" >
              <p>
                Login
                <span
                  style={{ margin: "5px" }}
                  className="glyphicon glyphicon-log-in"
                ></span>
              </p>{" "}
            </NavLink>
            <NavLink activeStyle to="/register">
              <p style={{ marginLeft: "10px" }}>
                Register
                <span
                  style={{ margin: "5px" }}
                  className="glyphicon glyphicon-user"
                ></span>
              </p>{" "}
            </NavLink></div> 
           
             }
        </div>
      </div>
      <hr
        style={{ width: "80%", margin: "0 auto", paddingBottom: "50px" }}
      ></hr>
    </>
  );
};

export default Dashboard;
