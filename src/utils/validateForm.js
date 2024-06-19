export const validateForm = ({ email, password, nickname = null }) => {
  if (nickname !== null && nickname.trim() === '') {
    alert('닉네임을 입력하세요.');
    return false;
  }
  if (!email || !password) {
    alert('이메일과 비밀번호를 입력하세요.');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('올바른 이메일 형식이 아닙니다.');
    return false;
  }
  if (password.length < 6) {
    alert('비밀번호는 6자리 이상이어야 합니다.');
    return false;
  }

  return true;
};
