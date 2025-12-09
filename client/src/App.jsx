import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Library from './pages/Library';
import Likes from './pages/Likes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Auth />} />
        <Route path="library" element={<Library />} />
        <Route path="likes" element={<Likes />} />
      </Route>
    </Routes>
  );
}

export default App;
