// TeamMemberForm.jsx - 팀원 유형 입력 컴포넌트
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamMemberForm() {
    const navigate = useNavigate();
    const [teamMembers, setTeamMembers] = useState([
        { nickname: '', type: '탐험가형' }
    ]);
    const [submitting, setSubmitting] = useState(false);

    const memberTypes = [
        '탐험가형',
        '계획가형',
        '모험가형',
        '안전가형',
        '자유가형',
        '체험가형',
        '휴식가형',
        '문화가형'
    ];

    // 팀원 추가
    const addTeamMember = () => {
        if (teamMembers.length < 8) {
            setTeamMembers([...teamMembers, { nickname: '', type: '탐험가형' }]);
        }
    };

    // 팀원 제거
    const removeTeamMember = (index) => {
        if (teamMembers.length > 1) {
            setTeamMembers(teamMembers.filter((_, i) => i !== index));
        }
    };

    // 닉네임 변경
    const updateNickname = (index, nickname) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index].nickname = nickname;
        setTeamMembers(updatedMembers);
    };

    // 유형 변경
    const updateType = (index, type) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index].type = type;
        setTeamMembers(updatedMembers);
    };

    // 팀 추가하기
    const handleAddTeam = async () => {
        // 빈 닉네임 체크
        const emptyNicknames = teamMembers.filter(member => !member.nickname.trim());
        if (emptyNicknames.length > 0) {
            alert('모든 팀원의 닉네임을 입력해주세요!');
            return;
        }

        try {
            setSubmitting(true);
            
            // 세션에서 userId 가져오기
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (!userId) {
                alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
                navigate('/');
                return;
            }

            // 팀 정보 저장
            const response = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    teamMembers: teamMembers
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert('팀이 성공적으로 등록되었습니다!');
                navigate('/team-analysis'); // 팀 분석 페이지로 이동
            } else {
                alert(result.message || '팀 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error adding team:', error);
            alert('팀 등록 중 오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    // 팀 검색 보기
    const handleViewTeams = () => {
        navigate('/team-search');
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
                    position: 'relative',
                    paddingTop: 4,
                    paddingBottom: 12,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/* 뒤로가기 버튼 */}
                    <div
                        onClick={() => navigate('/')}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            transform: 'translateY(2px)',
                            fontSize: 20,
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '0 10px',
                            borderRadius: 8,
                            backgroundColor: '#fff',
                        }}
                        aria-label="이전으로 가기"
                        role="button"
                    >
                        ←
                    </div>

                    {/* 타이틀 */}
                    <div style={{
                        fontWeight: 800,
                        fontSize: 18,
                        color: '#0f172a',
                        textAlign: 'center',
                        width: '100%',
                        paddingBottom: 30,
                    }}>
                        Travel Balance
                    </div>
                </div>

                {/* 제목 */}
                <div style={{
                    fontWeight: 900,
                    fontSize: 28,
                    marginBottom: 12,
                    color: '#0f172a'
                }}>
                    팀원 유형을 입력하세요
                </div>

                {/* 부제목 */}
                <div style={{
                    fontWeight: 600,
                    fontSize: 20,
                    marginBottom: 55,
                    color: '#0f172a'
                }}>
                    최대 8명까지 추가할 수 있어요.
                </div>

                {/* 팀원 입력 폼 */}
                <div style={{
                    flex: 1,
                    marginBottom: 20
                }}>
                    {teamMembers.map((member, index) => (
                        <div key={index} style={{
                            marginBottom: 20
                        }}>
                            {/* 팀원 번호와 삭제 버튼 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 12
                            }}>
                                <span style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: '#0f172a'
                                }}>
                                    팀원 {index + 1}
                                </span>
                                {teamMembers.length > 1 && (
                                    <button
                                        onClick={() => removeTeamMember(index)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: 16,
                                            cursor: 'pointer',
                                            color: '#ef4444',
                                            padding: '4px',
                                            fontWeight: 700
                                        }}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* 닉네임 입력 */}
                            <input
                                type="text"
                                placeholder="예: 민영, Explorer_7"
                                value={member.nickname}
                                onChange={(e) => updateNickname(index, e.target.value)}
                                disabled={submitting}
                                style={{
                                    width: '100%',
                                    padding: '20px 16px',
                                    marginBottom: 16,
                                    borderRadius: 12,
                                    border: '1px solid #e2e8f0',
                                    fontSize: 15,
                                    fontFamily: 'inherit',
                                    backgroundColor: '#fff',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}
                            />

                            {/* 유형 선택 */}
                            <select
                                value={member.type}
                                onChange={(e) => updateType(index, e.target.value)}
                                disabled={submitting}
                                style={{
                                    width: '100%',
                                    padding: '20px 16px',
                                    borderRadius: 12,
                                    border: '1px solid #e2e8f0',
                                    fontSize: 15,
                                    fontFamily: 'inherit',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    appearance: 'none',
                                    boxSizing: 'border-box',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%230f172a' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 16px center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px',
                                    paddingRight: '50px'
                                }}
                            >
                                {memberTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {/* 팀원 추가 버튼 */}
                    {teamMembers.length < 8 && (
                        <button
                            onClick={addTeamMember}
                            disabled={submitting}
                            style={{
                                width: '100%',
                                padding: '20px 16px',
                                marginBottom: 36,
                                borderRadius: 12,
                                border: '2px dashed #e2e8f0',
                                backgroundColor: 'transparent',
                                color: '#0f172a',
                                fontSize: 15,
                                fontWeight: 700,
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                fontFamily: 'inherit',
                                opacity: submitting ? 0.5 : 1,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}
                        >
                            + 팀원 추가
                        </button>
                    )}
                </div>

                {/* 하단 버튼들 */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: 45
                }}>
                    <button
                        onClick={handleViewTeams}
                        disabled={submitting}
                        style={{
                            width: '40%',
                            padding: '12px 14px',
                            borderRadius: 14,
                            background: '#6b7280',
                            color: '#ffffff',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: 15,
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            fontFamily: 'inherit',
                            opacity: submitting ? 0.7 : 1
                        }}
                    >
                        팀원 추가
                    </button>
                    
                    <button
                        onClick={handleAddTeam}
                        disabled={submitting}
                        style={{
                            width: '40%',
                            marginLeft: 'auto',
                            padding: '12px 14px',
                            borderRadius: 14,
                            background: 'linear-gradient(135deg,#3db2edff, #a78bfa)',
                            color: '#ffffff',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: 15,
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            fontFamily: 'inherit',
                            opacity: submitting ? 0.7 : 1
                        }}
                    >
                        {submitting ? '등록 중...' : '팀 검색 보기'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TeamMemberForm;