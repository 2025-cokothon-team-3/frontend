import { useEffect, useMemo, useState } from 'react';
import globeImg from '../assets/images/여행_마크.png';

function Home() {
  // 닉네임과 공유링크 상태
  const [nickname, setNickname] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  // 현재 페이지 URL (렌더 때마다 새로 만들 필요 없으므로 useMemo)
  const shareLink = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

  // 닉네임 기억하기 (로컬 저장/불러오기)
  useEffect(() => {
    const saved = localStorage.getItem('nickname');
    if (saved) setNickname(saved);
  }, []);
  useEffect(() => {
    if (nickname.trim()) {
      localStorage.setItem('nickname', nickname.trim());
    }
  }, [nickname]);

  const handleSubmit = () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력해주세요!');
      return;
    }
    // 추후 라우팅으로 연결될 자리 (예: navigate(`/result?nick=${encodeURIComponent(nickname)}`))
    console.log('닉네임:', nickname);
  };

  const handleShareClick = async () => {
    try {
      if (navigator.clipboard && shareLink) {
        await navigator.clipboard.writeText(shareLink);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 1500);
      }
    } catch (e) {
      // fallback
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
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 760, // 앱웹 사이즈
          margin: '24px',
          borderRadius: 24,
          padding: 24,
          background: '#ffffff',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* 상단 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', marginLeft: 110 }}>4TH COKOTHON 011조</div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <button
              onClick={handleShareClick}
              style={{
                borderRadius: 20,
                padding: '8px 14px',
                fontWeight: 700,
                border: '1px solid #e2e8f0',
                background: shareCopied ? '#22c55e' : '#ffffff',
                color: shareCopied ? '#ffffff' : '#0f172a',
                cursor: 'pointer'
              }}
              aria-label="Share link"
              title="현재 페이지 링크 복사"
            >
              {shareCopied ? 'Copied!' : 'Share link'}
            </button>
          </div>
        </div>

        {/* 메인 영역 */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {/* 좌측 이미지 */}
          <div
            style={{
              flex: '1 1 0',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #d4e3eeff 0%, #afb7c2ff 100%)',
              borderRadius: 20,
              padding: 24
            }}
          >
            <img
              src={globeImg}
              alt="여행 아이콘"
              style={{ width: '100%', maxWidth: 280, height: 'auto', filter: 'drop-shadow(0 8px 16px rgba(2,132,199,.25))' }}
            />
          </div>

          {/* 우측 컨텐츠 */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#0f172a' }}>여행 성향 궁합 테스트</h1>
            <p
              style={{
                marginTop: 10,
                display: 'inline-block',
                background: '#ecf9ff',
                color: '#0284c7',
                padding: '6px 12px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 13
              }}
            >
              친구야, 우리.. 같이 여행 가도 괜찮을까..?
            </p>

            <div style={{ marginTop: 18 }}>
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 15) setNickname(value);
                }}
                maxLength={15}
                placeholder="Enter nickname"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 16px',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  outline: 'none',
                  fontSize: 14
                }}
              />
            </div>

            <div style={{ marginTop: 14, color: '#64748b', fontSize: 12 }}>
              저장된 닉네임: <strong>{nickname || '없음'}</strong>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                marginTop: 18,
                padding: '12px 18px',
                borderRadius: 16,
                background: '#111827',
                color: 'white',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              나만의 테스트 만들기
            </button>
          </div>
        </div>

        {/* 하단 도움 텍스트 */}
        <div style={{ marginTop: 18, fontSize: 12, color: '#94a3b8' }}>
          공유 링크: <span style={{ userSelect: 'all' }}>{shareLink}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;