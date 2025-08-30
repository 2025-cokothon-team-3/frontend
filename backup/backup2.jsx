import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/images/사진1.png';

function Question1() {
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
      const questionId = 1;  // 이걸 바꿔가면서 2번, 3번 문제로 넘기면 됨
      const res = await fetch(`http://52.68.59.48:8081/api/questions/${questionId}`);
      const data = await res.json();

      const question = data.data;

      setQuestionText(question.content);
      setChoices([
        question.choice1,
        question.choice2,
        question.choice3
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
    navigate('/question2');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fefaf3',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
      paddingTop: 0,
      paddingBottom: 48
    }}>
      <div style={{
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 32
      }}>
        Travel balance
      </div>
      <div style={{
        width: '90%',
        maxWidth: 460,
        borderRadius: 24,
        padding: '80px 24px',
        background: '#ffffff',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden'
      }}>
        <div
          onClick={() => navigate(-1)}
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 12,
            marginTop: -16,
            cursor: 'pointer',
            padding: '0px 10px',
            borderRadius: 8,
            backgroundColor: '#fff',
            //boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'inline-block',
            alignSelf: 'flex-start'
          }}
        >
          ←
        </div>
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

        <div style={{ fontWeight: 900, fontSize: 28, marginBottom: 12 }}>Q1.</div>

        {loading ? (
          <div style={{ fontWeight: 600, fontSize: 18 }}>불러오는 중...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <>
            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 40 }}>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Question1;