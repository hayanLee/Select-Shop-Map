import { useEffect, useState } from 'react';
import { LoginWithEmail } from '../../api/auth';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    await LoginWithEmail({ email, password });
    localStorage.setItem('savedEmail', email);
    localStorage.setItem('savedPassword', password);
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
            <p className="mt-1 text-xs">비밀 번호는 6자리 이상이여야 합니다.</p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 h-6 w-6 rounded-md border-none"
            />
            <label>Remember me</label>
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
