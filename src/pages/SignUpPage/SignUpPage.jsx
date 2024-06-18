import { useState } from 'react';
import { signUpWithEmail } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../supabase/supabaseClient';

function SignUpPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!nickname || !email || !password) {
      alert('모든 필드를 입력하세요.');
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const { data, error } = await supabase.from('users').select('*').eq('email', email);
    if (error) {
      alert('회원 가입 중 오류가 발생했습니다.');
      console.error('회원 가입 오류:', error);
      return;
    }
    if (data.length > 0) {
      alert('이미 가입된 이메일입니다.');
      return;
    }
    await signUpWithEmail({ email, password, nickname });
    // 입력 필드를 초기화
    setNickname('');
    setEmail('');
    setPassword('');
    // 회원가입 후 페이지 이동
    navigate('/login');
  };

  return (
    <div className="mt-32 flex justify-center px-28">
      <div className="flex w-full flex-col">
        <p className="mb-9 text-4xl font-bold">Sign Up</p>
        <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
          <div>
            <p>닉네임</p>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요."
              className="h-12 w-full bg-input pl-4 focus:outline-active"
            />
          </div>
          <div>
            <p>Email</p>
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
          </div>
          <button className="mt-12 h-12 w-full bg-active pl-4 font-bold text-white hover:bg-hover">회원가입</button>
        </form>
        <Link to="/login" className="mt-3">
          이미 계정이 있으신가요? 로그인 하러가기
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
