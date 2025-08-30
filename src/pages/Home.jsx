import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import globeImg from '../assets/images/여행_마크.png';

function Home() {
    // 상태
    const [nickname, setNickname] = useState('');
    const [shareCopied, setShareCopied] = useState(false);
    const navigate = useNavigate();

    // 현재 페이지 URL
    const shareLink = useMemo(
        () => (typeof window !== 'undefined' ? window.location.href : ''),
        []
    );

    // 저장된 닉네임 로드
    useEffect(() => {
        const saved = localStorage.getItem('nickname');
        if (saved) setNickname(saved);
    }, []);

    // 닉네임 변화 시 저장
    useEffect(() => {
        if (nickname.trim()) {
            localStorage.setItem('nickname', nickname.trim());
        }
    }, [nickname]);

    // 제출
    const handleSubmit = () => {
        if (nickname.trim() === '') {
            alert('닉네임을 입력해주세요!');
            return;
        }
        localStorage.setItem('nickname', nickname.trim());
        navigate('/question1');
    };

    // 공유 링크 복사
    const handleShareClick = async () => {
        try {
            if (navigator.clipboard && shareLink) {
                await navigator.clipboard.writeText(shareLink);
                setShareCopied(true);
                setTimeout(() => setShareCopied(false), 1500);
            }
        } catch {
            const temp = document.createElement('input');
            temp.value = shareLink;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 1500);
        }
    };

    return (
        <div
            // 화면 전체 배경 + 중앙 정렬
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
                fontFamily:
                    '"SBAggroL", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
            }}
        >
            <div
                // 휴대폰 프레임 컨테이너
                style={{
                    position: 'relative', // 하단 Share 버튼 absolute 배치용
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
                {/* 헤더 (Share 버튼은 제거) */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        marginBottom: 12,
                    }}
                >
                    <div
                        style={{
                            fontWeight: 100,
                            fontSize: 16,
                            color: '#0f172a',
                            display: 'flex',
                            justifyContent: 'center', // 내부 컨텐츠 중앙
                            width: '100%', // 한 줄 전체 차지
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        Travel Balance
                    </div>
                </div>

                {/* 메인 콘텐츠 */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                    }}
                >
                    {/* 이미지 카드 */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background:
                                'linear-gradient(135deg, #d4e3eeff 0%, #afb7c2ff 100%)',
                            borderRadius: 18,
                            padding: 16,
                        }}
                    >
                        <img
                            src={globeImg}
                            alt="여행 아이콘"
                            style={{
                                width: '70%',
                                maxWidth: 220,
                                height: 'auto',
                                filter: 'drop-shadow(0 8px 16px rgba(2,132,199,.25))',
                            }}
                        />
                    </div>

                    {/* 텍스트/입력 영역 */}
                    <div>
                        <h1
                            style={{
                                fontSize: 28,
                                fontWeight: 900,
                                margin: 10,
                                color: '#0f172a',
                                lineHeight: 1.25,
                            }}
                        >
                            여행 성향 케미 테스트
                        </h1>

                        <p
                            style={{
                                marginTop: 5,
                                marginBottom: 50,
                                display: 'inline-block',
                                background: '#ecf9ff',
                                color: '#0284c7',
                                padding: '6px 10px',
                                borderRadius: 999,
                                fontWeight: 700,
                                fontSize: 12,
                            }}
                        >
                            친구야.. 우리는 여행 어떻게 해야될까 ...?
                        </p>

                        {/* 닉네임 입력 */}
                        <div style={{ marginTop: 14 }}>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 15) setNickname(value);
                                }}
                                maxLength={15}
                                placeholder="닉네임을 입력하세요"
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    padding: '18px 14px',
                                    borderRadius: 14,
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: 18,
                                }}
                                aria-label="닉네임 입력"
                            />
                        </div>
                    </div>
                </div>

                {/* ===== 하단 영역: 버튼들을 아래로 내리기 위해 marginTop:'auto' 사용 ===== */}
                <div
                    style={{
                        marginTop: 'auto',
                        paddingTop: 8,
                        paddingRight: 8, // 오른쪽 Share 버튼과 간격
                        paddingBottom: 72, // Share 버튼(아래 구석)과 겹치지 않도록 여유 공간
                    }}
                >
                    <button
                        onClick={handleSubmit}
                        style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 14,
                            background: '#111827',
                            color: 'white',
                            border: 'none',
                            fontWeight: 800,
                            cursor: 'pointer',
                            fontSize: 15,
                            // 테스트 버튼을 화면 더 아래쪽에 보이도록 하단 여백은 최소화,
                            // 대신 아래쪽 Share 버튼이 더 낮게 배치됨 (absolute)
                            marginBottom: 8,
                        }}
                        aria-label="테스트 하러 가기"
                    >
                        테스트 하러 가기
                    </button>
                </div>

                {/* ===== 오른쪽 아래 구석: Share 버튼 (테스트 버튼보다 더 아래) ===== */}
                <button
                    onClick={handleShareClick}
                    style={{
                        position: 'absolute',
                        right: 12,
                        bottom: 12, // 가장 아래 구석
                        borderRadius: 999,
                        padding: '10px 14px',
                        fontWeight: 700,
                        border: '1px solid #e2e8f0',
                        background: shareCopied ? '#22c55e' : '#ffffff',
                        color: shareCopied ? '#ffffff' : '#0f172a',
                        cursor: 'pointer',
                        fontSize: 12,
                        boxShadow: '0 6px 16px rgba(2, 6, 23, 0.12)',
                    }}
                    aria-label="현재 페이지 링크 복사"
                    title="현재 페이지 링크 복사"
                >
                    {shareCopied ? 'Copied!' : 'Share'}
                </button>
            </div>
        </div>
    );
}

export default Home;
