import React, { Component }  from 'react';
import { Route, Router, Routes, Link } from 'react-router-dom';

import './landing.css'


 const Landing = () =>{

    return ( 

         <div className="test">
            <div className="title">
               <h1>FunStock</h1>    
            </div>
            <div className='para'>
               <p>Sky is the Limit</p>
            </div>
            <div className='landing-btnn'>
               <Link className='landing-btn' to="/input">Get Started</Link>    
            </div>
         </div>


     );
   
 }
 
export default Landing;