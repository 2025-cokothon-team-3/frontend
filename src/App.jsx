import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;