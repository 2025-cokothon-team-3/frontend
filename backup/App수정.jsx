/// Home.jsx 수정본

import axios from 'axios';
import { useMemo, useState } from 'react';
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

    // 제출
    const handleSubmit = async () => {
        if (nickname.trim() === '') {
            alert('닉네임을 입력해주세요!');
            return;
        }

        try {
            const response = await axios.post('http://52.68.59.48:8081/api/users/login', {
                nickname: nickname.trim(),
            });

            if (response.data.success) {
                navigate('/question1');
            } else {
                alert(response.data.message || '오류가 발생했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
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