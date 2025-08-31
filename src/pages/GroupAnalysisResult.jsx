import React, { useState, useEffect } from 'react';

function GroupAnalysisResult() {
  const [analysisData, setAnalysisData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // localStorage에서 분석 데이터 가져오기
    const savedData = localStorage.getItem('groupAnalysisData');
    
    if (savedData) {
      try {
        const { analysisData, members } = JSON.parse(savedData);
        setAnalysisData(analysisData);
        setMembers(members);
      } catch (error) {
        console.error('데이터 파싱 오류:', error);
        setError('분석 결과를 불러올 수 없습니다.');
      }
    } else {
      setError('분석 결과가 없습니다. 다시 분석해주세요.');
    }
    
    setLoading(false);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e'; // 녹색
    if (score >= 60) return '#f59e0b'; // 주황색  
    return '#ef4444'; // 빨간색
  };

  const getScoreText = (score) => {
    if (score >= 80) return '매우 좋음';
    if (score >= 60) return '보통';
    return '주의 필요';
  };

  const getTypeColor = (type) => {
    const colors = {
      '즉흥형': '#FF6B6B',
      '계획형': '#4ECDC4', 
      '절약형': '#45B7D1',
      '럭셔리형': '#F7DC6F',
      '휴식형': '#BB8FCE',
      '액티브형': '#58D68D',
      '개인형': '#85C1E9',
      '사교형': '#F8C471'
    };
    return colors[type] || '#6b7280';
  };

  const shareResult = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '그룹 여행 성향 분석 결과',
          text: `우리 ${members.length}명 그룹의 여행 호환성은 ${analysisData.compatibilityScore}점이에요!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      // Fallback: 텍스트 복사
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
      } catch (e) {
        alert('공유에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
      }}>
        <div style={{
          width: 390,
          maxWidth: '92vw',
          minHeight: 740,
          margin: '24px',
          borderRadius: 28,
          padding: 20,
          background: '#ffffff',
          boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>⏳</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#6b7280' }}>
            분석 결과를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
      }}>
        <div style={{
          width: 390,
          maxWidth: '92vw',
          minHeight: 740,
          margin: '24px',
          borderRadius: 28,
          padding: 20,
          background: '#ffffff',
          boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>😕</div>
          <div style={{ fontSize: 18, marginBottom: 20, textAlign: 'center', color: '#ef4444' }}>
            {error}
          </div>
          <button
            onClick={() => window.location.href = '/group-test'}
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
      padding: '20px 0'
    }}>
      <div style={{
        width: 390,
        maxWidth: '92vw',
        margin: '0 auto',
        borderRadius: 28,
        padding: 20,
        background: '#ffffff',
        boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
        border: '1px solid #e5e7eb',
      }}>
        {/* 헤더 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <div
            onClick={() => window.location.href = '/group-test'}
            style={{
              fontSize: 20,
              fontWeight: 700,
              cursor: 'pointer',
              padding: '0 10px',
              marginRight: 10,
            }}
          >
            ←
          </div>
          <h1 style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#0f172a',
            margin: 0,
          }}>
            그룹 여행 성향 분석
          </h1>
        </div>

        {/* 호환성 점수 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 16
          }}>
            {analysisData.memberCount}명의 여행 호환성 결과
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: getScoreColor(analysisData.compatibilityScore),
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 12
            }}>
              {analysisData.compatibilityScore}점
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: getScoreColor(analysisData.compatibilityScore)
            }}>
              {getScoreText(analysisData.compatibilityScore)}
            </div>
          </div>
        </div>

        {/* 그룹 멤버 */}
        {members.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#374151',
              marginBottom: 16
            }}>
              그룹 구성
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {members.map((member, index) => (
                <div key={member.id || index} style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: 16,
                  padding: 16,
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#1f2937'
                    }}>
                      {member.nickname}
                    </div>
                    {member.type && (
                      <div style={{
                        backgroundColor: getTypeColor(member.type),
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {member.type}
                      </div>
                    )}
                  </div>
                  {member.id && (
                    <div style={{ 
                      fontSize: 12, 
                      color: '#6b7280',
                      marginTop: 4 
                    }}>
                      ID: {member.id}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 분석 결과 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#374151',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center'
            }}>
              🔍 성향 분석
            </h3>
            <p style={{
              fontSize: 14,
              color: '#4b5563',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-line'
            }}>
              {analysisData.analysis}
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#374151',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center'
            }}>
              💡 추천사항
            </h3>
            <p style={{
              fontSize: 14,
              color: '#4b5563',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-line'
            }}>
              {analysisData.recommendations}
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#374151',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center'
            }}>
              ⚠️ 주의사항
            </h3>
            <p style={{
              fontSize: 14,
              color: '#4b5563',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-line'
            }}>
              {analysisData.warningPoints}
            </p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={shareResult}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            SHARE
          </button>
          
          <button
            onClick={() => window.location.href = '/group-test'}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 14,
              background: '#ffffff',
              color: '#374151',
              border: '2px solid #e5e7eb',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            RETRY
          </button>

          <button
            onClick={() => window.location.href = '/'}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 14,
              background: 'transparent',
              color: '#6b7280',
              border: 'none',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            HOME
          </button>
        </div>

        {/* 추가 정보 */}
        <div style={{
          marginTop: 24,
          padding: 16,
          backgroundColor: '#eff6ff',
          borderRadius: 16,
          border: '1px solid #dbeafe'
        }}>
          <h4 style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#1e40af',
            marginBottom: 8
          }}>
            여행 팁
          </h4>
          <p style={{
            fontSize: 12,
            color: '#1e40af',
            lineHeight: 1.5,
            margin: 0
          }}>
            호환성 점수가 낮아도 걱정하지 마세요! 서로 다른 성향이 오히려 더 풍부한 여행 경험을 만들어줄 수 있어요. 
            중요한 것은 서로를 이해하고 배려하는 마음입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GroupAnalysisResult;