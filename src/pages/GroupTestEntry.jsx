import React, { useState } from 'react';

function GroupTestEntry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // 닉네임으로 사용자 검색
  const searchUsers = async (nickname) => {
    if (!nickname.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/users/search?nickname=${encodeURIComponent(nickname)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('사용자 검색 오류:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 처리
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // 디바운싱을 위한 타이머
    setTimeout(() => {
      if (searchTerm === value) {
        searchUsers(value);
      }
    }, 300);
  };

  // 팀원 추가
  const addMember = (user) => {
    if (selectedMembers.length >= 8) {
      alert('최대 8명까지만 추가할 수 있습니다.');
      return;
    }

    if (selectedMembers.some(member => member.id === user.id)) {
      alert('이미 추가된 팀원입니다.');
      return;
    }

    setSelectedMembers([...selectedMembers, user]);
    setSearchTerm('');
    setSearchResults([]);
  };

  // 팀원 제거
  const removeMember = (userId) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
  };

  // 그룹 분석 시작
  const startGroupAnalysis = async () => {
    if (selectedMembers.length < 2) {
      alert('최소 2명 이상의 팀원이 필요합니다.');
      return;
    }

    try {
      setAnalyzing(true);
      
      const userIds = selectedMembers.map(member => member.id);
      const response = await fetch('/api/travel-comparison/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIds: userIds
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // 결과를 localStorage에 저장하고 결과 페이지로 이동
        localStorage.setItem('groupAnalysisData', JSON.stringify({
          analysisData: data.data,
          members: selectedMembers
        }));
        window.location.href = '/group-result';
      } else {
        alert(data.message || '그룹 분석에 실패했습니다.');
      }
    } catch (error) {
      console.error('그룹 분석 오류:', error);
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setAnalyzing(false);
    }
  };

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
        padding: 20,
        background: '#ffffff',
        boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 헤더 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <div
            onClick={() => window.location.href = '/'}
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
            그룹 여행 분석
          </h1>
        </div>

        {/* 검색 입력 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 10,
            color: '#374151'
          }}>
            팀원 닉네임으로 검색
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="닉네임을 입력하세요"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid #d1d5db',
              outline: 'none',
              fontSize: 16,
            }}
          />
        </div>

        {/* 검색 결과 */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#6b7280', margin: '10px 0' }}>
            검색 중...
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div style={{
            maxHeight: 150,
            overflowY: 'auto',
            marginBottom: 20,
            border: '1px solid #e5e7eb',
            borderRadius: 12,
          }}>
            {searchResults.map(user => (
              <div
                key={user.id}
                onClick={() => addMember(user)}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#1f2937' }}>
                    {user.nickname}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    ID: {user.id}
                  </div>
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#3b82f6',
                  fontWeight: 500
                }}>
                  추가
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 선택된 팀원들 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 10,
            color: '#374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>선택된 팀원</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              {selectedMembers.length}/8명
            </span>
          </div>
          
          {selectedMembers.length === 0 ? (
            <div style={{
              padding: 20,
              textAlign: 'center',
              color: '#9ca3af',
              backgroundColor: '#f9fafb',
              borderRadius: 12,
              border: '2px dashed #d1d5db'
            }}>
              팀원을 추가해주세요
            </div>
          ) : (
            <div style={{ 
              maxHeight: 200, 
              overflowY: 'auto',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
            }}>
              {selectedMembers.map(member => (
                <div key={member.id} style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f8fafc'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>
                      {member.nickname}
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      ID: {member.id}
                    </div>
                  </div>
                  <button
                    onClick={() => removeMember(member.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: 18,
                      padding: 4
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 분석 시작 버튼 */}
        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={startGroupAnalysis}
            disabled={selectedMembers.length < 2 || analyzing}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 14,
              background: selectedMembers.length >= 2 && !analyzing
                ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                : '#d1d5db',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: 16,
              cursor: selectedMembers.length >= 2 && !analyzing ? 'pointer' : 'not-allowed',
              opacity: analyzing ? 0.7 : 1
            }}
          >
            {analyzing ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: 20,
                  height: 20,
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: 8
                }} />
                분석 중...
              </div>
            ) : (
              `그룹 분석 시작하기 (${selectedMembers.length}명)`
            )}
          </button>
        </div>

        {/* 도움말 */}
        <div style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f0f9ff',
          borderRadius: 12,
          fontSize: 12,
          color: '#1e40af'
        }}>
          💡 팁: 각자 개별 테스트를 완료한 후에 그룹 분석을 진행해주세요.
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default GroupTestEntry;