import Swal from 'sweetalert2';

export const validateForm = ({ email, password, nickname = null }) => {
  if (nickname !== null && nickname.trim() === '') {
    Swal.fire({
      title: '오류',
      text: '닉네임을 입력하세요.',
      icon: 'error',
      confirmButtonText: '확인'
    });
    return false;
  }
  if (!email || !password) {
    Swal.fire({
      title: '오류',
      text: '이메일과 비밀번호를 입력하세요.',
      icon: 'error',
      confirmButtonText: '확인'
    });
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      title: '오류',
      text: '올바른 이메일 형식이 아닙니다.',
      icon: 'error',
      confirmButtonText: '확인'
    });
    return false;
  }
  if (password.length < 6) {
    Swal.fire({
      title: '오류',
      text: '비밀번호는 6자리 이상이어야 합니다.',
      icon: 'error',
      confirmButtonText: '확인'
    });
    return false;
  }

  return true;
};
