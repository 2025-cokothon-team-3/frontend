import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';
import Question4 from './pages/Question4';
import Question5 from './pages/Question5';
import Question6 from './pages/Question6';
import Question7 from './pages/Question7';
import Question8 from './pages/Question8';
import Question9 from './pages/Question9';
import Question10 from './pages/Question10';
import Question11 from './pages/Question11';
import Question12 from './pages/Question12';
import Question13 from './pages/Question13';
import Question14 from './pages/Question14';
import Question15 from './pages/Question15';
import Question16 from './pages/Question16';

import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />
        <Route path="/question4" element={<Question4 />} />
        <Route path="/question5" element={<Question5 />} />
        <Route path="/question6" element={<Question6 />} />
        <Route path="/question7" element={<Question7 />} />
        <Route path="/question8" element={<Question8 />} />
        <Route path="/question9" element={<Question9 />} />
        <Route path="/question10" element={<Question10 />} />
        <Route path="/question11" element={<Question11 />} />
        <Route path="/question12" element={<Question12 />} />
        <Route path="/question13" element={<Question13 />} />
        <Route path="/question14" element={<Question14 />} />
        <Route path="/question15" element={<Question15 />} />
        <Route path="/question16" element={<Question16 />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;