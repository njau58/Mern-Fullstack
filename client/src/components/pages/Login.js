import React ,{useState,useEffect}from 'react'
import {useNavigate,NavLink} from  'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {toast } from 'react-toastify'
import{useDispatch, useSelector} from 'react-redux'
import {loginInitiate} from '../../Redux/auth/authActions'


const Login = () => {

    const initialState = {
     
        email:'',
        password:''
      }
      const [user, setUser] = useState(initialState)
      const [passwordShown, setPasswordShown] = useState(false);
      const token  = useSelector((state) => state.user.token);
      const error  = useSelector((state) => state.user.error);
      const loading = useSelector((state) => state.user.loading);
      
   
      const navigate = useNavigate()
      const dispatch = useDispatch()


      useEffect(()=>{

        if(error){
        
      let errorMessage
      if(error.response.status===403){
 
       errorMessage = 'Email not registered.'
        
      }
      if(error.response.status===422){
 
       errorMessage = 'Invalid credentials.'
        
      }
      if(error.response.status===500){
 
       errorMessage = 'Network error.Pleasetry again later.'
        
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

    
    const handleOnChange = (event) =>{
      setUser({...user,[event.target.name]:event.target.value })
    }
    
    
    
      const handleSubmit = (event) =>{
        event.preventDefault()
      
        if(!user.password ){
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
        dispatch(loginInitiate(user))
    
        }
    
    
      }

      const forgotPassword = () =>{

        window.open('https://mernnjau.herokuapp.com/api/forgot-password');
      }

 
    
      return (<>

        <div
          className="container overflow-auto"
          style={{marginTop:'-60px', maxWidth: "700px", OverflowY: "scroll" }}
        >
          <h3>Login</h3>
          <hr />
          <div
            className="formContainer"
            style={{
              border: "solid 1px #eee",
              borderRadius: "4px",
              padding: "18px",
              boxShadow:' 0 0 30px #ccc',
              zIndex:'5000'
            }}
          >
            <form onSubmit={handleSubmit} >
        
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
    
              <div style={{ marginBottom:'-1px'}} className="form-group">
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
              <p  onClick={forgotPassword} style={{ cursor:'pointer', fontSize:'1.3rem', marginTop:'0px', display:'flex',justifyContent:'flex-end',textAlign:'center'}}>Forgot password?</p>
              <div style={{ width:"100%", display: "flex", justifyContent: "center" }}>
                <input  style={{width:"90%",outline:'none' }}  type="submit" value={loading?"Loading...":"Login"}  className={`btn + ${loading?'disabled' :null} + btn-primary`} />
              </div>
             <p style={{ fontSize:'1.3rem', marginTop:'10px', display:'flex',justifyContent:'flex-start',textAlign:'center'}}  ><input style={{marginRight:'5px'}} type='checkbox'></input><p>Keep me logged in</p></p> 
          <p style={{ fontSize:'1.3rem', marginTop:'0', display:'flex',justifyContent:'center',textAlign:'center'}}><p>Don't have an account?</p>  
            <NavLink to='/register'> <p >Join Crud</p></NavLink>
            </p> 
            
            
            </form>
          
          </div>
      
    
        </div>

        </>);
}

export default Login