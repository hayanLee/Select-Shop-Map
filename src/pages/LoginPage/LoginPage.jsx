function LoginPage() {
  return (
    <div className="mt-48 flex justify-center pl-96 pr-96">
      <div className="flex w-full flex-col gap-3 pl-36 pr-36">
        <p className="mb-9 text-4xl font-bold">Log In</p>{' '}
        <div>
          <p>Email Address</p>
          <input className="bg-input h-12 w-full pl-4" placeholder="이메일을 입력하세요." />
        </div>
        <div>
          <p>Password</p>
          <input className="bg-input h-12 w-full pl-4" placeholder="비밀번호를 입력하세요." />
        </div>
        <button className="mt-12 h-12 w-full bg-active pl-4 font-bold text-white">Log In</button>
        <p>아직 계정이 없으신가요? 회원 가입 하러가기</p>
      </div>
    </div>
  );
}

export default LoginPage;
