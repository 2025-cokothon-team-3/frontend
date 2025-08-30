import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question1';
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question1" element={<Question />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;