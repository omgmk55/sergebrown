import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Music from './pages/Music';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import AudioPlayer from './components/AudioPlayer';
import { AudioProvider, useAudio } from './context/AudioContext';

import FanZone from './pages/FanZone';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';

function GlobalAudioPlayer() {
  const { currentTrack, closePlayer } = useAudio();
  return <AudioPlayer track={currentTrack} onClose={closePlayer} />;
}

function AppContent() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/fan-zone" element={<FanZone />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <GlobalAudioPlayer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;

