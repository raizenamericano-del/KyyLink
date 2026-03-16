import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '@/pages/Home';
import { Create } from '@/pages/Create';
import { Explore } from '@/pages/Explore';
import { PublicProfile } from '@/pages/PublicProfile';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/:username" element={<PublicProfile />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
