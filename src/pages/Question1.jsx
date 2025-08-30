import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Question1() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const handleNext = () => {
        if (selected === null) {
            alert('선택지를 골라주세요!');
            return;
        }
        // 추후 선택 결과 저장 로직 추가 가능
        navigate('/question2');
    };

    const choices = [
        '숙소랑 비행기 예약하면 끝! 나머지는 그때 가서 생각하지 뭐 ㅋ',
        '꼭 필요한 예약이랑 가고 싶은 곳 정도는 정리해 둘까?',
        '휴가를 망칠 수 없지! 엑셀에 분 단위로 계획 세움',
    ];

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
                style={{
                    width: '100%',
                    maxWidth: 460,
                    margin: '24px',
                    borderRadius: 24,
                    padding: 24,
                    background: '#ffffff',
                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}
                >
                    방구석연구소
                </div>
                <div
                    style={{ fontWeight: 800, fontSize: 24, marginBottom: 16 }}
                >
                    Q1.{' '}
                    <span style={{ fontWeight: 500 }}>
                        여행 계획을 세울 때 나는
                    </span>
                </div>

                {choices.map((text, index) => (
                    <button
                        key={index}
                        onClick={() => setSelected(index)}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            marginBottom: 12,
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
                                    ? '0 4px 10px rgba(2,132,199,.2)'
                                    : '0 2px 6px rgba(0,0,0,0.05)',
                        }}
                    >
                        {text}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    style={{
                        width: '100%',
                        marginTop: 12,
                        padding: '12px 18px',
                        borderRadius: 16,
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        fontWeight: 800,
                        cursor: 'pointer',
                        fontSize: 14,
                    }}
                >
                    다음 문제 →
                </button>
            </div>
        </div>
    );
}

export default Question1;
