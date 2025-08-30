import { useState } from 'react';

function GroupInput() {
  const [userIds, setUserIds] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!userIds.trim()) {
      alert('user ID를 입력해주세요.');
      return;
    }

    try {
      const userIdArray = userIds
        .split(',')
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));

      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: userIdArray }),
      });

      if (!res.ok) throw new Error('전송 실패');

      setStatus('전송 완료!');
    } catch (error) {
      console.error(error);
      setStatus('전송에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>여행 구성원 user ID 입력</h2>
      <p>쉼표(,)로 user ID를 구분해 입력해주세요.</p>
      <textarea
        rows="4"
        cols="50"
        placeholder="예: 1, 2, 3, 4"
        value={userIds}
        onChange={(e) => setUserIds(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '20px',
          resize: 'none',
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        전송
      </button>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}

export default GroupInput;