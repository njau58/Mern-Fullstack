
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../common/Spinner'
import logo from '../../assets/images/logo.png'




const Me = () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const loading = useSelector(state=>state.user.loading)


    const [userData, setData] = useState({})
   
    
    const navigate = useNavigate()
    useEffect(()=>{
setData(currentUser)
console.log(currentUser)



if(!currentUser){
    navigate('/')
}

    },[navigate])

    if(loading){
        return <Spinner/>
    }


  return (<>
    <div  style={{marginTop:'-80px'}}  className="container">
    <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
          
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <img  style={{ marginTop:'5px',objectFit:'contain' ,display:'flex', width:'50%'}} src={currentUser.image?currentUser.image:logo} alt="profile" className="img-circle img-responsive" />
                    </div>
                    <div  style={{marginTop:'5px',marginRight:'100px'}} className="col-sm-6 col-md-8">
                        <h4>  <i style={{marginRight:'10px'}} className="glyphicon glyphicon-user"></i>
                           {userData?.name}</h4>
                      
                        <p>
                            <i style={{marginRight:'10px'}} className="glyphicon glyphicon-envelope"></i>{userData?.email}
                            <br />
                
                            <i style={{marginRight:'10px'}} className="glyphicon glyphicon-gift"></i>ID:{userData?._id}</p>
                    
                    </div>
                </div>
          
        </div>
        </div>
        </div>
        </>
  )
}

export default Me