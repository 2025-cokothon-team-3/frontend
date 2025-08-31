// src/pages/Cover.jsx
import { useNavigate } from 'react-router-dom';
// 표지 이미지 경로: src/images/cover.jpg (원하는 파일명으로 변경 가능)
import coverImg from '../images/cover.jpg';

function Cover() {
  const navigate = useNavigate();

  const goStart = () => {
    navigate('/home'); // Home.jsx로 이동
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
          '"SBAggroL", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
      }}
    >
      <div
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
        {/* 상단 타이틀 */}
        <div
          style={{
            fontWeight: 800,
            fontSize: 18,
            color: '#0f172a',
            textAlign: 'center',
            paddingTop: 4,
          }}
        >
          Travel Balance
        </div>

        {/* 표지 이미지 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #d4e3eeff 0%, #afb7c2ff 100%)',
            borderRadius: 18,
            padding: 16,
            marginTop: 16,
          }}
        >
          <img
            src={coverImg}
            alt="여행 표지"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 420,
              objectFit: 'cover',
              borderRadius: 12,
              filter: 'drop-shadow(0 8px 16px rgba(2,132,199,.25))',
            }}
          />
        </div>

        {/* 타이틀/서브타이틀 */}
        <div style={{ marginTop: 18 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#0f172a',
              lineHeight: 1.25,
              margin: '8px 0 6px',
            }}
          >
            여행 성향 케미 테스트
          </h1>
          <p
            style={{
              marginTop: 0,
              marginBottom: 40,
              display: 'inline-block',
              background: '#ecf9ff',
              color: '#0284c7',
              padding: '6px 13px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            친구야, 우리.. 같이 여행 가도 괜찮을까..?
          </p>
        </div>

        {/* 하단 CTA 버튼 */}
        <div style={{ marginTop: 'auto', paddingBottom: 8 }}>
          <button
            onClick={goStart}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 14,
              background: 'linear-gradient(135deg,#3db2edff, #a78bfa)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: 15,
            }}
            aria-label="테스트 여행 떠나기"
            title="테스트 여행 떠나기"
          >
            테스트 여행 떠나기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cover;