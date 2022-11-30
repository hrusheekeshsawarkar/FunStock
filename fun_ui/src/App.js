import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
  Link,
} from "react-router-dom";
import React, { Component }  from 'react';
import axios from 'axios';


import logo from './logo.svg';
import './App.css';
import Landing from "./components/landing/Landing";
import Input from './components/input/Input';
import Form from "./components/form/Form";
import Output from "./components/output/Output";

class App extends React.Component {
  
  state = {
      details : [],
  }

  componentDidMount() {

      let data ;

      axios.get('http://localhost:8000/wel/')
      .then(res => {
          data = res.data;
          this.setState({
              details : data    
          });
      })
      .catch(err => {})
  }

render() {

  return (
    
    <div className="App">
          
      <Router>
          <Routes>
            <Route path="/" exact element={ <Landing/>} /> 
            <Route path="/input" element={<Input />} />
            <Route path="/form" element={<Form />} />
            <Route path="/output" element={<Output />} />
          </Routes>
          
      </Router>

        </div>
  );
}
}

export default App;
