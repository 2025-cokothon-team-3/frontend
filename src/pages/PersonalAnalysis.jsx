// src/pages/PersonalAnalysis.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) {
          alert('사용자 정보를 찾을 수 없습니다.');
          navigate('/');
          return;
        }

        // 결과 타입 받아오기
        const res = await fetch(`/api/test-results/personality/${userId}`);
        if (!res.ok) throw new Error('결과를 불러올 수 없습니다');
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        alert('결과 조회 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [navigate]);

  const handleRetest = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <div>결과 불러오는 중...</div>;
  if (!result) return <div>결과가 존재하지 않습니다.</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', borderRadius: '16px', padding: '30px' }}>
        <h2 style={{ fontSize: '20px' }}>🌟 당신의 유형</h2>
        <h1 style={{ fontSize: '28px', margin: '10px 0' }}>{result.title}</h1>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>✈️ 당신의 여행 스타일</h3>
        <p>{result.description}</p>

        {result.categories.map((cat) => (
          <div key={cat.name} style={{ marginTop: '20px' }}>
            <p style={{ marginBottom: '4px' }}>{cat.name} <b>{cat.label}</b> {cat.score}%</p>
            <div style={{ background: '#eee', height: '12px', borderRadius: '8px' }}>
              <div
                style={{
                  width: `${cat.score}%`,
                  height: '100%',
                  background: '#60a5fa',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        ))}

        <div style={{ marginTop: '30px' }}>
          <button onClick={handleRetest} style={buttonStyle}>retest</button>
          <button style={buttonStyle}>Share</button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button style={{ ...buttonStyle, backgroundColor: '#a78bfa' }}>
            우리의 여행 밸런스 알아보기 -&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  marginRight: '12px',
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#3b82f6',
  color: 'white'
};

export default PersonalAnalysis;