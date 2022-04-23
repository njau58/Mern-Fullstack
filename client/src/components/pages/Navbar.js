import React from 'react'
import { NavLink } from './NavElements'

const Navbar = () => {
  return (<>
    <div style={{display:'flex', justifyContent:'flex-start' ,marginTop:'-30px',marginLeft:'80px'}}>
          <div className="center">
        <div style={{ display: "flex", justifyContent: "space-between" }}>

       
<NavLink to='/view-profiles'><p><small>Profiles</small></p></NavLink>
<NavLink to='/my-account'><p style={{marginLeft:'5px'}}><small>Account</small></p></NavLink>
<NavLink to='/about'><p style={{marginLeft:'5px'}}><small>About</small></p></NavLink>

</div>

     

        </div>
       
    </div>
    <hr     style={{ width: "80%",paddingBottom:'10px',marginTop:'0px', marginLeft:'auto',marginRight:'auto', marginBottom:'50px'}}/>

    </>
  )
}

export default Navbar