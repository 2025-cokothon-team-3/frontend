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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    }}>
      <div style={{
        position: 'relative',
        width: 390,
        maxWidth: '92vw',
        minHeight: 740,
        margin: '24px',
        borderRadius: 28,
        padding: 24,
        background: '#ffffff',
        boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 4 }}>🌟</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>당신의 유형</div>
          <div style={{ fontWeight: 900, fontSize: 24, marginTop: 6 }}>{result.title}</div>
        </div>

        {/* 설명 */}
        <div style={{
          background: '#f1f5f9',
          borderRadius: 16,
          padding: '20px 16px',
          fontSize: 14,
          color: '#334155',
          lineHeight: 1.6,
          marginBottom: 20
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>✈️ 당신의 여행 스타일</div>
          <div>{result.description}</div>
        </div>

        {/* 카테고리별 점수 */}
        {result?.categories?.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 20 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 6
            }}>
              <span>{cat.name}</span>
              <span style={{ color: '#0284c7' }}>{cat.label} {cat.score}%</span>
            </div>
            <div style={{
              backgroundColor: '#e2e8f0',
              height: 12,
              borderRadius: 8,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${cat.score}%`,
                backgroundColor: '#60a5fa',
                height: '100%'
              }} />
            </div>
          </div>
        ))}

        {/* 버튼 영역 */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 30 }}>
            <button onClick={handleRetest} style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer'
            }}>retest</button>

            <button style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer'
            }}>Share</button>
          </div>

          <button style={{
            marginTop: 20,
            width: '100%',
            padding: '14px',
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 14,
            background: 'linear-gradient(135deg,#a78bfa,#818cf8)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
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