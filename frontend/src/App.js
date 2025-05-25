import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Confirm from './pages/Confirm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
      <Route path="/confirm/:orderId" element={<Confirm />} />
      </Routes>
    </Router>
  );
}

export default App;
