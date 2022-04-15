import React from 'react'

const Footer = () => {
  return (
  

<div style={{marginTop:'40px'}} className="container">
  <div className="row">
  
    <div className="col-lg-12">
      <div className="col-md-8">
        <a href="#">Terms of Service</a> | <a href="#">Privacy</a>    
      </div>
      <div className="col-md-4">
        <p className="muted pull-right">	Copyright © <small>{new Date().getFullYear()}</small> Softlab. All rights reserved</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default Footer