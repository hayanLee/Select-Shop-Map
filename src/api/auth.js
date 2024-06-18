import supabase from '../supabase/supabaseClient';

export const signUpWithEmail = async ({ email, password, nickname }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    if (error.code === 'weak_password') alert('비밀번호는 6자리 이상이여야 합니다.');
    else alert('회원가입 중 오류가 발생했습니다.');
    return;
  }

  if (data.user) {
    const { id, email } = data.user;
    if (!nickname) nickname = String(crypto.randomUUID().slice(1, 8));
    await insertUserData({ id, email, nickname });
    alert('회원가입 성공하였습니다!');
  }
};

export const LoginWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // 로그인 되면
  if (data) {
    console.log(data);
    alert('로그인 성공하였습니다');
  }
  if (error) alert('로그인 실패하였습니다');
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  alert('로그아웃 되었습니다');
  if (error) alert('로그아웃이 실패하였습니다');
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    console.log(data.user);
    return data.user;
  }
  if (error) {
    console.log('로그인한 유저 없음', error);
  }
};

export const insertUserData = async (userInfo) => {
  console.log(userInfo);
  const { id, email, nickname } = userInfo;
  const { data, error } = await supabase.from('users').insert({
    id,
    created_at: new Date(),
    email,
    nickname
  });
  if (error) alert('회원 정보 저장 중 오류가 발생했습니다.');
};
