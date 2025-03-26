import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import EmployeeDetails from './components/EmployeDetails/EmployeeDetails';
import TestAPI from './components/Test/TestAPI'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route path="/test" element={<TestAPI />} />
      </Routes>
    </Router>
  );
}

export default App;