import supabase from '../supabase/supabaseClient';

export const signUpWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  if (data.user) alert('회원가입 성공하였습니다!');
  if (error) alert('이미 존재하는 이메일 또는 비밀번호는 6자리 이상으로 해주세요');
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
