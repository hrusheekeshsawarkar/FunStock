import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
  Link,
} from "react-router-dom";


import logo from './logo.svg';
import './App.css';
import Landing from "./components/landing/Landing";

function App() {
  return (
    
    <div className="App">
          
      <Router>
          <Routes>
            <Route path="/" exact element={ <Landing/>} /> 
          </Routes>
          
      </Router>
        </div>
  );
}

export default App;
