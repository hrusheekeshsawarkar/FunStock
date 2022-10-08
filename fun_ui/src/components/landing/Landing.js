import { Route, Router, Routes, Link } from 'react-router-dom';

import Input from '../input/Input';
import './landing.css'


 const Landing = () =>{

    return ( 
      //  <Router>
         // <Routes>
         //    <Route path="/" element={<Input />} />
         // </Routes>
         <div className="test">
            <div className="title">
               <h1>FunStock</h1>    
            </div>
            <div className='para'>
               <p>Sky is the Limit</p>
            </div>
            <div className='btnn'>
               <Link className='btn' to="/input">Get Started</Link>    
            </div>
         </div>
      // </Router>

     );
   
 }
 
export default Landing;