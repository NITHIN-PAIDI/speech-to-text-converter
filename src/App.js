import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import TextToSpeech from './components/text-to-speech';

function App() {
  return (
    <Router>
      <div className='App-container'>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/sign-in" element = {<Login/>}/>
          <Route path="/speech-to-text" element={<TextToSpeech />} />

        </Routes>
      </div>
    </Router>
 
 
  );
}

export default App;
