import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Formulaire from '../pages/Formulaire';
import FAQ from '../pages/FAQ';
import Glossaire from '../pages/Glossaire';
import Aides from '../pages/Aides';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onStart={() => window.location.href='/estimation'} />} />
        <Route path="/estimation" element={<Formulaire onBack={() => window.location.href='/'} />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/glossaire" element={<Glossaire />} />
        <Route path="/aides" element={<Aides />} />
      </Routes>
    </BrowserRouter>
  );
}
