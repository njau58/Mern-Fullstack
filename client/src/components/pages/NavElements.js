
import {NavLink as LinkR} from 'react-router-dom'
import styled from 'styled-components'


export const NavLink = styled(LinkR)`
text-decoration:none;
display: flex;
align-items: center;
padding:0 5px;
height:100%;
cursor:pointer;


&.active {
   
    border-bottom:2px solid #15cdfc;
    text-decoration:none

}
&:hover{
    transition:all 0.2s ease-in-out;
    text-decoration:none;
    
   
 

}`