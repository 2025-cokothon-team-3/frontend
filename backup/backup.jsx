import banner from '../assets/images/사진1.png';
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
    '휴가를 망칠 수 없지! 엑셀에 분 단위로 계획 세움'
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fefaf3',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
        paddingTop: 0,
        paddingBottom: 48
      }}
    >
      <div style={{
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 16
      }}>
        Travel balance
      </div>
      <div
        style={{
          width: '90%',
          maxWidth: 460,
          borderRadius: 24,
          padding: '80px 24px',
          background: '#ffffff',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden'
        }}
      >
        <img
          src={banner}
          alt="Top Banner"
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: 24,
            borderRadius: 12
          }}
        />
        <div style={{
          fontWeight: 900,
          fontSize: 28,
          marginBottom: 12
        }}>
          Q1.
        </div>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 40 }}>
          여행 계획을 세울 때 나는
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
              border: selected === index ? '2px solid #0284c7' : '1px solid #e2e8f0',
              boxShadow: selected === index ? '0 6px 15px rgba(2,132,199,.3)' : '0 4px 10px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-wrap'
            }}
          >
            {text}
          </button>
        ))}

        <button
          onClick={handleNext}
          style={{
            width: '35%',
            marginTop: 12,
            padding: '20px 16px',
            borderRadius: 12,
            background: '#3db2edff',
            color: '#ffffff',
            border: '4px solid white',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            whiteSpace: 'pre-wrap',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            fontFamily: 'inherit',
            marginLeft: 'auto',
            display: 'block'
          }}
        >
          다음 문제 →
        </button>
      </div>
    </div>
  );
}

export default Question1;