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
        const res = await fetch(`/api/test-results/user/${userId}`);
        if (!res.ok) throw new Error('결과를 불러올 수 없습니다');
        const data = await res.json();
        const {
          planningType,
          budgetType,
          activityType,
          socialType,
          planningScore,
          budgetScore,
          activityScore,
          socialScore,
          dominantType
        } = data.data;

        // 카테고리별 타입 매핑 (양극성 구조)
        const getTypeLabels = (type) => {
          const typeMap = {
            // 여행 계획
            '계획형': { left: '즉흥형', right: '계획형' },
            '즉흥형': { left: '즉흥형', right: '계획형' },
            
            // 여행 예산  
            '절약형': { left: '절약형', right: '럭셔리형' },
            '럭셔리형': { left: '절약형', right: '럭셔리형' },
            
            // 여행 활동
            '휴식형': { left: '휴식형', right: '액티브형' },
            '액티브형': { left: '휴식형', right: '액티브형' },
            
            // 사교 성향
            '개인형': { left: '개인형', right: '사교형' },
            '사교형': { left: '개인형', right: '사교형' }
          };
          return typeMap[type] || { left: type, right: type };
        };

        setResult({
          title: dominantType,
          description: '계획을 체계적으로 세우는 것을 선호하며, 합리적인 예산으로 활동적인 여행을 즐기는 사교적인 성향을 보이고 있습니다.',
          categories: [
            {
              name: '여행 계획',
              score: (planningScore / 12) * 100,
              label: planningType,
              totalScore: planningScore,
              maxScore: 12,
              labels: getTypeLabels(planningType),
              emoji: '📋'
            },
            {
              name: '여행 예산',
              score: (budgetScore / 12) * 100,
              label: budgetType,
              totalScore: budgetScore,
              maxScore: 12,
              labels: getTypeLabels(budgetType),
              emoji: '💰'
            },
            {
              name: '여행 활동',
              score: (activityScore / 12) * 100,
              label: activityType,
              totalScore: activityScore,
              maxScore: 12,
              labels: getTypeLabels(activityType),
              emoji: '🏃'
            },
            {
              name: '사교 성향',
              score: (socialScore / 12) * 100,
              label: socialType,
              totalScore: socialScore,
              maxScore: 12,
              labels: getTypeLabels(socialType),
              emoji: '👥'
            }
          ]
        });
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
        {result?.categories?.map((cat, index) => (
          <div key={cat.name} style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 8
            }}>
              <span style={{ color: '#1f2937' }}>{cat.name}</span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                color: '#0284c7',
                fontSize: '13px'
              }}>
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span>{Math.round(cat.score)}%</span>
              </span>
            </div>
            
            {/* 프로그레스바 */}
            <div style={{
              backgroundColor: '#e5e7eb',
              height: 10,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 8
            }}>
              <div style={{
                width: `${cat.score}%`,
                backgroundColor: index === 0 ? '#10b981' : 
                              index === 1 ? '#0ea5e9' : 
                              index === 2 ? '#84cc16' : 
                              '#f59e0b',
                height: '100%',
                borderRadius: 20,
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>
            
            {/* 프로그레스바 아래 레이블과 점수 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 12,
              color: '#6b7280'
            }}>
              <span style={{ fontWeight: 500 }}>{cat.labels.left}</span>
              <span style={{ fontWeight: 500 }}>{cat.labels.right}</span>
            </div>
            
            {/* 중앙 점수 표시 */}
            <div style={{
              textAlign: 'center',
              marginTop: 6,
              fontSize: 13,
              color: '#6b7280',
              fontWeight: 600
            }}>
              {cat.totalScore}/{cat.maxScore}점
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

          <button
            onClick={() => navigate('/group-test')}
            style={{
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
          }}
          >
            우리의 여행 밸런스 알아보기 -&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalAnalysis;