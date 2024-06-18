import { useEffect, useState } from 'react';
import { LoginWithEmail } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const validateForm = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const userInfo = await LoginWithEmail({ email, password });
      if (userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate('/');
        setEmail('');
        setPassword('');
        //로그인 성공 후 홈페이지로 이동, 입력 필드 초기화
      } else {
        console.error('로그인 후 사용자 정보를 받아오지 못했습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error.message);
    }
  };

  return (
    <div className="mt-32 flex justify-center px-28">
      <div className="flex w-full flex-col">
        <p className="mb-9 text-4xl font-bold">Log In</p>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div>
            <p>Email Address</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full bg-input pl-4 focus:outline-active"
              placeholder="이메일을 입력하세요."
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full bg-input pl-4 focus:outline-active"
              placeholder="비밀번호를 입력하세요."
            />
            <p className="mt-1 text-xs">비밀 번호는 6자리 이상이어야 합니다.</p>
          </div>
          <button className="mt-3 h-12 w-full bg-active pl-4 font-bold text-white hover:bg-hover">Log In</button>
        </form>
        <Link to="/signup" className="mt-3">
          아직 계정이 없으신가요? 회원 가입 하러가기
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
