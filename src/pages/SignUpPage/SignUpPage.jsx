import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isEmailRegistered, signUpWithEmail } from '../../api/auth';
import { validateForm } from '../../utils/validateForm';

function SignUpPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm({ email, password, nickname })) return;
    if (!(await isEmailRegistered({ email }))) return;

    await signUpWithEmail({ email, password, nickname });
    setNickname('');
    setEmail('');
    setPassword('');
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
              className="h-12 w-full bg-input pl-4 shadow-lg focus:outline-active"
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full bg-input pl-4 shadow-lg focus:outline-active"
              placeholder="이메일을 입력하세요."
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full bg-input pl-4 shadow-lg focus:outline-active"
              placeholder="비밀번호를 입력하세요."
            />
          </div>
          <button className="mt-12 h-12 w-full bg-active pl-4 font-bold text-white hover:bg-hover">회원가입</button>
        </form>
        <Link to="/login" className="mt-3 text-[#3490dc]">
          이미 계정이 있으신가요? 로그인 하러가기
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
