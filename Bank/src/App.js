import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DocumentUpload from './components/DocumentUpload';
import LoanEligibility from './components/LoanEligibility';
import VideoInteraction from './components/VideoInteraction';
import Navigation from './components/Navigation';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Navigation/>
  

<Router>
  <Routes>
    <Route path="/" element={<Home/>} />

    <Route path="/LoanEligibility" element={<LoanEligibility />} />

    <Route path="/DocumentUpload" element={  <DocumentUpload/>} />
    <Route path="/VideoInteraction" element={     <VideoInteraction/>} />

  </Routes>
</Router>
    
    </div>
  );
}

export default App;
