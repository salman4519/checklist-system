import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import OpeningPage from './pages/opening/OpeningPage';
import ClosingPage from './pages/closing/ClosingPage';
import MagisterPanelPage from './pages/magister/MagisterPanelPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/opening" element={<OpeningPage />} />
        <Route path="/closing" element={<ClosingPage />} />
        <Route path="/magister" element={<MagisterPanelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
