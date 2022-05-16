import React from 'react'
import { NavLink } from './NavElements'

const Navbar = () => {
  return (<>
    <div style={{display:'flex', justifyContent:'flex-start' ,marginTop:'-130px',marginBottom:'100px',marginLeft:'80px'}}>
          <div className="center">
        <div style={{ display: "flex", justifyContent: "space-between" }}>

       
<NavLink to='/view-profiles'><p><small>Profiles</small></p></NavLink>
<NavLink to='/my-account'><p style={{marginLeft:'5px'}}><small>Account</small></p></NavLink>
<NavLink to='/about'><p style={{marginLeft:'5px'}}><small>About</small></p></NavLink>

</div>

     

        </div>
       
    </div>
   
    </>
  )
}

export default Navbar