import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question'; // 새로 추가할 동적 컴포넌트
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* 동적 질문 라우트 */}
        <Route path="/question/:questionNumber" element={<Question />} />
        
        {/* 기존 라우트들은 새 라우트로 리다이렉트 */}
        <Route path="/question1" element={<Navigate to="/question/1" replace />} />
        <Route path="/question2" element={<Navigate to="/question/2" replace />} />
        <Route path="/question3" element={<Navigate to="/question/3" replace />} />
        <Route path="/question4" element={<Navigate to="/question/4" replace />} />
        <Route path="/question5" element={<Navigate to="/question/5" replace />} />
        <Route path="/question6" element={<Navigate to="/question/6" replace />} />
        <Route path="/question7" element={<Navigate to="/question/7" replace />} />
        <Route path="/question8" element={<Navigate to="/question/8" replace />} />
        <Route path="/question9" element={<Navigate to="/question/9" replace />} />
        <Route path="/question10" element={<Navigate to="/question/10" replace />} />
        <Route path="/question11" element={<Navigate to="/question/11" replace />} />
        <Route path="/question12" element={<Navigate to="/question/12" replace />} />
        <Route path="/question13" element={<Navigate to="/question/13" replace />} />
        <Route path="/question14" element={<Navigate to="/question/14" replace />} />
        <Route path="/question15" element={<Navigate to="/question/15" replace />} />
        <Route path="/question16" element={<Navigate to="/question/16" replace />} />
        
        <Route path="/personal-analysis" element={<PersonalAnalysis />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;