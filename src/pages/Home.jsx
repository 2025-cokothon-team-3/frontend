// handleSubmit 함수에서 네비게이션 부분 수정
const handleSubmit = async () => {
    if (nickname.trim() === '') {
        alert('닉네임을 입력해주세요!');
        return;
    }

    try {
        const response = await axios.post('/api/users/login', {
            nickname: nickname.trim(),
        });

        if (response.data.success) {
            // 사용자 ID를 세션에 저장
            const userId = response.data.data.id || response.data.data.userId;
            sessionStorage.setItem('userId', userId.toString());
            localStorage.setItem('userId', userId.toString());
            
            // 동적 라우트로 이동
            navigate('/question/1'); // 이 부분 수정
        } else {
            alert(response.data.message || '오류가 발생했습니다.');
        }
    } catch (error) {
        // 에러 처리는 그대로
        if (error.response?.data?.message) {
            alert(error.response.data.message);
        } else {
            alert('서버 오류가 발생했습니다.');
        }
    }
};