import supabase from '../supabase/supabaseClient';

export const signUpWithEmail = async ({ email, password, nickname }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    if (error.code === 'weak_password') alert('비밀번호는 6자리 이상이어야 합니다.');
    else alert('회원가입 중 오류가 발생했습니다.');
    return;
  }

  if (data.user) {
    const { id, email } = data.user;
    if (!nickname) nickname = String(crypto.randomUUID().slice(1, 8));
    await insertUserData({ id, email, nickname });
    alert('회원가입에 성공하였습니다!');
  }
};

export const LoginWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('로그인에 실패하였습니다.');
    console.error('로그인 오류:', error);
    return null;
  }

  if (data && data.user) {
    alert('로그인에 성공하였습니다.');
    const userInfo = await getUserInfo(data.user.id);
    if (userInfo) {
      return userInfo;
    } else {
      console.error('사용자 정보를 가져오지 못했습니다.');
      return null;
    }
  }
  return null;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  alert('로그아웃 되었습니다.');
  if (error) alert('로그아웃에 실패하였습니다.');
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
  const { id, email, nickname } = userInfo;
  const { error } = await supabase.from('users').insert({
    id,
    created_at: new Date(),
    email,
    nickname
  });
  if (error) alert('회원 정보 저장 중 오류가 발생했습니다.');
};

export const getUserInfo = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) {
    console.error('사용자 정보를 가져오는 중 오류 발생:', error.message);
    return null;
  }
  return data;
};
