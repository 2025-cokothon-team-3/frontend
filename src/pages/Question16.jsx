import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Question16() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    // 🔹 API로 받아올 데이터 상태
    const [questionText, setQuestionText] = useState('');
    const [choices, setChoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 API 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionId = 16;
                const res = await fetch(
                    `/api/questions/${questionId}`
                );
                const data = await res.json();

                const question = data.data;

                setQuestionText(question.content);
                setChoices([
                    question.choice1,
                    question.choice2,
                    question.choice3,
                ]);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching question:', err);
                setError('질문을 불러오지 못했어요.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNext = () => {
        if (selected === null) {
            alert('선택지를 골라주세요!');
            return;
        }
        navigate('/result');
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
                fontFamily:
                    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
            }}
        >
            <div
                // 휴대폰 프레임
                style={{
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
                }}
            >
                {/* ===== 카드 내부 헤더(가운데 정렬) ===== */}
                <div
                    style={{
                        position: 'relative',
                        paddingTop: 4,
                        paddingBottom: 12,
                        marginBottom: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* 뒤로가기 아이콘: 왼쪽 고정 */}
                    <div
                        onClick={() => navigate(-1)}
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
                    {/* 오른쪽 상단 진행도 표시 */}
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            transform: 'translateY(2px)',
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#fff',
                            backgroundColor: '#0f172a',
                            padding: '4px 10px',
                            borderRadius: 20,
                        }}
                    >
                        16 / 16
                    </div>

                    {/* 가운데 타이틀 */}
                    <div
                        style={{
                            fontWeight: 800,
                            fontSize: 18,
                            color: '#0f172a',
                            textAlign: 'center',
                            width: '100%',
                            paddingBottom: 30,
                        }}
                    >
                        Travel Balance
                    </div>
                </div>

                {/* 본문 */}
                <div
                    style={{ fontWeight: 900, fontSize: 28, marginBottom: 12 }}
                >
                    Q16.
                </div>

                {loading ? (
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                    >
                        불러오는 중...
                    </div>
                ) : error ? (
                    <div style={{ color: 'red' }}>{error}</div>
                ) : (
                    <>
                        <div
                            style={{
                                fontWeight: 600,
                                fontSize: 20,
                                marginBottom: 55,
                            }}
                        >
                            {questionText}
                        </div>

                        {choices.map((text, index) => (
                            <button
                                key={index}
                                onClick={() => setSelected(index)}
                                style={{
                                    width: '100%',
                                    padding: '20px 16px',
                                    marginBottom: 36,
                                    textAlign: 'left',
                                    background: '#fff',
                                    borderRadius: 12,
                                    fontWeight: 700,
                                    fontSize: 15,
                                    cursor: 'pointer',
                                    border:
                                        selected === index
                                            ? '2px solid #0284c7'
                                            : '1px solid #e2e8f0',
                                    boxShadow:
                                        selected === index
                                            ? '0 6px 15px rgba(2,132,199,.3)'
                                            : '0 4px 10px rgba(0,0,0,0.1)',
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {text}
                            </button>
                        ))}

                        <button
                            onClick={handleNext}
                            style={{
                                width: '40%',
                                marginTop: 45,
                                marginLeft: 'auto',
                                display: 'block',
                                padding: '12px 14px',
                                borderRadius: 14,
                                background: '#3db2edff',
                                color: '#ffffff',
                                border: 'none',
                                fontWeight: 800,
                                fontSize: 15,
                                cursor: 'pointer',
                                whiteSpace: 'pre-wrap',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                fontFamily: 'inherit',
                                background:
                                    'linear-gradient(135deg,#3db2edff, #a78bfa)',
                            }}
                        >
                            NEXT →
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Question16;
