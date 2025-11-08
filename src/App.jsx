// 🎯 src/App.jsx
// ============================================
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import './index.css'
import Candles from './pages/Candles';
import Cake from './pages/Cake';
// import Balloons from './pages/Balloons';
import Gift from './pages/Gift';
import Gallery from './pages/Gallery';
import Letter from './pages/Letter';
// import Ending from './pages/Ending';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candles" element={<Candles />} />
          <Route path='/cake' element={<Cake />} />
          {/* <Route path="/balloons" element={<Balloons />} />

          <Route path="/ending" element={<Ending />} />
          <Route path="*" element={<Navigate to="/" />} /> */}

          <Route path="/gift" element={<Gift />} />
          <Route path='/gallery' element = {<Gallery />} />
          <Route path='/letter' element={<Letter />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;