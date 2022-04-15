import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div style={{backgroundColor:'rgba(0, 0, 0.5, 0.6)',zIndex:'5000',top:'0',bottom:'0', right:'0',left:'0',position:'fixed', display:'flex', justifyContent:'center', alignItems:'center'}}><TailSpin color="white" height={80} width={80} /></div>
  )
}

export default Spinner