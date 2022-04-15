
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

    },[currentUser, navigate])

    if(loading){
        return <Spinner/>
    }


  return (<>
    <div style={{position:'relative',right:'-25%'}} className="container">
    <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
            <div className="well well-sm">
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <img  style={{ objectFit:'contain' ,backgroundColor:'white',width:'50px', height:'50px',borderRadius:'50%'}} src={logo} alt="profile" className="img-rounded img-responsive" />
                    </div>
                    <div className="col-sm-6 col-md-8">
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
        </div>
        </>
  )
}

export default Me