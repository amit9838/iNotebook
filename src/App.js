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


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  }


  return (
    <>
        <Router>
          <NoteState>
          <Navbar showAlert={showAlert}/>
          {alert && <Alert alert = {alert}/>}
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route path="/about" element={<About  showAlert={showAlert} />}></Route>
            <Route path="/login" element={<Login  showAlert={showAlert} />}></Route>
            <Route path="/signup" element={<Signup  showAlert={showAlert} />}></Route>
          </Routes>
        </NoteState>
        </Router>
    </>
  );
}

export default App;
