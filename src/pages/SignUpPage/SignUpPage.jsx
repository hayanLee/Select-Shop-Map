import { useState } from 'react';
import { signUp } from '../../components/signUp/SignUp';

function SignUpPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // await signUp({ email, password, nickname });
  };
  return (
    <div className="mt-48 flex justify-center pl-96 pr-96">
      <div className="flex w-full flex-col gap-3 pl-36 pr-36">
        <p className="mb-9 text-4xl font-bold">Sign Up</p>{' '}
        <div>
          <p>닉네임</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요."
            className="h-12 w-full bg-input pl-4"
          />
        </div>
        <div>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full bg-input pl-4"
            placeholder=" 이메일을 입력하세요."
          />
        </div>
        <div>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full bg-input pl-4"
            placeholder=" 비밀번호를 입력하세요."
          />
        </div>
        <button className="mt-12 h-12 w-full bg-active pl-4 font-bold text-white">회원가입</button>
        <p>이미 계정이 있으신가요? 로그인 하러가기</p>
      </div>
    </div>
  );
}

export default SignUpPage;
