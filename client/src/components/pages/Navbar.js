import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display:'flex', justifyContent:'flex-start' ,marginBottom:'80px',marginTop:'-30px',marginLeft:'80px'}}>
          <div className="center">
        <div style={{ display: "flex", justifyContent: "space-between" }}>

       
<NavLink to='/view-profiles'><p style={{marginRight:'10px'}}><small>Profiles</small></p></NavLink>
<NavLink to='/my-account'><p style={{marginRight:'10px'}}><small>Account</small></p></NavLink></div>
     

        </div>
    
    </div>
  )
}

export default Navbar