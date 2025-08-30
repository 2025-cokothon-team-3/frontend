// Question.jsx - 동적 질문 컴포넌트
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Question() {
    const navigate = useNavigate();
    const { questionNumber } = useParams(); // URL에서 질문 번호 가져오기
    const [selected, setSelected] = useState(null);
    
    // API로 받아올 데이터 상태
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const TOTAL_QUESTIONS = 16;
    const currentQuestionNum = parseInt(questionNumber) || 1;

    // API 호출
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // 백엔드 API: 질문 순서로 조회
                const response = await fetch(`/api/questions/order/${currentQuestionNum}`);
                const data = await response.json();

                if (data.success) {
                    setQuestionData(data.data);
                } else {
                    setError(data.message || '질문을 불러오지 못했습니다.');
                }
            } catch (err) {
                console.error('Error fetching question:', err);
                setError('질문을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
        setSelected(null); // 새 질문 로드시 선택 초기화
    }, [currentQuestionNum]);

    // 답변 제출 및 다음 질문으로 이동
    const handleNext = async () => {
        if (selected === null) {
            alert('선택지를 골라주세요!');
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
            
            // 답변 저장
            const response = await fetch('/api/user-answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: parseInt(userId),  // userId 추가됨
                    questionId: questionData.id,
                    selectedChoice: selected + 1, // 1, 2, 3으로 변환
                }),
            });

            const result = await response.json();

            if (result.success) {
                // 마지막 질문인 경우 테스트 결과 계산을 위해 일괄 제출
                if (currentQuestionNum >= TOTAL_QUESTIONS) {
                    try {
                        // 테스트 결과 계산을 위해 제출
                        const testResultResponse = await fetch(`/api/tests/submit/${userId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                        
                        if (!testResultResponse.ok) {
                            console.error('테스트 결과 계산 실패');
                        }
                    } catch (error) {
                        console.error('테스트 결과 계산 중 오류:', error);
                    }
                    
                    navigate('/result');
                } else {
                    navigate(`/question/${currentQuestionNum + 1}`);
                }
            } else {
                alert(result.message || '답변 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            alert('답변 저장 중 오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    // 이전 질문으로 돌아가기
    const handlePrevious = () => {
        if (currentQuestionNum > 1) {
            navigate(`/question/${currentQuestionNum - 1}`);
        } else {
            navigate('/'); // 첫 번째 질문이면 홈으로
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
                    <div style={{
                        fontSize: 40,
                        marginBottom: 20
                    }}>⏳</div>
                    <div style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#6b7280'
                    }}>질문을 불러오는 중...</div>
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
                    <div style={{ color: 'red', textAlign: 'center' }}>
                        <div style={{ fontSize: 40, marginBottom: 20 }}>😕</div>
                        <div style={{ fontSize: 18, marginBottom: 20 }}>{error}</div>
                        <button 
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 10,
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 16
                            }}
                        >
                            다시 시도
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                {/* 진행률 표시 */}
                <div style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    borderRadius: 9999,
                    padding: '6px 12px',
                    fontWeight: 800,
                    fontSize: 14,
                    letterSpacing: 0.5,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.18)'
                }}>
                    {currentQuestionNum} / {TOTAL_QUESTIONS}
                </div>

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
                        onClick={handlePrevious}
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

                {/* 질문 번호 */}
                <div style={{
                    fontWeight: 900,
                    fontSize: 28,
                    marginBottom: 12
                }}>
                    Q{currentQuestionNum}.
                </div>

                {/* 질문 내용 */}
                <div style={{
                    fontWeight: 600,
                    fontSize: 20,
                    marginBottom: 55,
                    whiteSpace: 'pre-line'
                }}>
                    {questionData?.content}
                </div>

                {/* 선택지 */}
                {[questionData?.choice1, questionData?.choice2, questionData?.choice3].map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => setSelected(index)}
                        disabled={submitting}
                        style={{
                            width: '100%',
                            padding: '20px 16px',
                            marginBottom: 36,
                            textAlign: 'left',
                            background: '#fff',
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            border: selected === index
                                ? '2px solid #0284c7'
                                : '1px solid #e2e8f0',
                            boxShadow: selected === index
                                ? '0 6px 15px rgba(2,132,199,.3)'
                                : '0 4px 10px rgba(0,0,0,0.1)',
                            whiteSpace: 'pre-line',
                            opacity: submitting ? 0.7 : 1
                        }}
                    >
                        {choice}
                    </button>
                ))}

                {/* 다음 버튼 */}
                <button
                    onClick={handleNext}
                    disabled={submitting}
                    style={{
                        width: '40%',
                        marginTop: 45,
                        marginLeft: 'auto',
                        display: 'block',
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
                    {submitting ? '저장 중...' : (currentQuestionNum >= TOTAL_QUESTIONS ? '결과 보기' : 'NEXT →')}
                </button>
            </div>
        </div>
    );
}

export default Question;