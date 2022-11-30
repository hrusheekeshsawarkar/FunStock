import { Route, Router, Routes, Link } from 'react-router-dom';
import './Input.css'
import React, { Component }  from 'react';

const Input = () => {
    return ( 
        <div className='input'>
            <div className='text'>
                <h2>Select one of the following according to your expertise</h2>
            </div>

            <div className='choice'>
                <Link className='btn' to="/form">No Experience</Link> 
                <Link className='btn' to="/ex">Enough Experience</Link> 
            </div>
            <div className='padding'>

            </div>
            <div className='choice'>
                <Link className='btn' to="/">Back</Link> 
            </div>
        </div>
     );
}
 
export default Input;
