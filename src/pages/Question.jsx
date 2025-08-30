// handleNext 함수의 답변 저장 부분 수정
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
        
        // 답변 저장 (userId 포함)
        const response = await fetch('/api/user-answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: parseInt(userId),
                questionId: questionData.id,
                selectedChoice: selected + 1, // 1, 2, 3으로 변환
            }),
        });

        const result = await response.json();

        if (result.success) {
            // 다음 질문으로 이동 또는 결과 페이지로
            if (currentQuestionNum >= TOTAL_QUESTIONS) {
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