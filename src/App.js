import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Optional: Custom styles
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import About from './components/About';
import Alert  from './components/Alert';
import Employee from './components/Employee';
import HomePage from './components/HomePage';

function App() {
    const [text, setText] = useState('Enter Text here...');
   
    let [mode, setMode] = useState('dark');
    let [modeText, setModeText] = useState('Enable LightMode');
    let [alertText, setAlertText] = useState(null);
    let showAlert = (message,type) => {
        setAlertText({
            msg: message,
            type: type
        })
    }

    const toggleMode = () => {
        if(mode === 'light'){
        setMode('dark');
        setModeText('Enable LightMode');
        showAlert("Dark Mode has been enabled","Sucess");
        }
        else {
           setMode('light');
           setModeText('Enable DarkMode');
           showAlert("Light Mode has been enabled","Sucess");
        }
        console.log('Mode:', mode); // Debug log
         console.log('ModeText:', modeText); 
         console.log('alert message:', alertText); 
    }

    return (
        <Router>
        <div className="App">
            {/* Navigation Bar */}
            <Navbar title="TextUtils" aboutText="About SrikarSrivati" mode={mode} toggleMode={toggleMode} modeText={modeText}></Navbar>
             <Alert alertText={alertText}/>
            {/* Main Content */}
            <div className="container mt-4">
            <Routes>
            <Route exact path="/homepage" element={<HomePage />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/textform" element={<Textform text={text} setText={setText}  placeholder="Enter your text here..."/>} />
            <Route path="/about" element={<About />} />
          </Routes>
            </div>
            <footer className="bg-dark text-white text-center">
                <p>&copy; 2024 Text Utils. All Rights Reserved.</p>
            </footer>
        </div>
        </Router>
    );
}

export default App;