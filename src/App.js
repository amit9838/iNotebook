import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {


  const [alert, setAlert] = useState({message:"",type:""});

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert({message:"",type:""});
    }, 1500);
  }


  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert = {alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route path="/about" element={<About  showAlert={showAlert} />}></Route>
            <Route path="/login" element={<Login  showAlert={showAlert} />}></Route>
            <Route path="/signup" element={<Signup  showAlert={showAlert} />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
