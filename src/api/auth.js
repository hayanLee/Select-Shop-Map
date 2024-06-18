import supabase from '../supabase/supabaseClient';

export const signUpWithEmail = async ({ email, password, nickname }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    if (data.user) {
      const { id, email } = data.user;
      if (!nickname) nickname = String(crypto.randomUUID().slice(1, 8));
      await insertUserData({ id, email, nickname });
      alert('회원가입 성공하였습니다!');
    }
  } catch {
    alert('회원가입 중 오류가 발생했습니다.');
  }
};

export const LoginWithEmail = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // 로그인 되면
    if (error) throw error;
    if (data) {
      alert('로그인 성공하였습니다');
      return await getUserInfo(data.user.id);
    }
  } catch {
    alert('로그인 중 오류가 발생하였습니다.');
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    alert('로그아웃 되었습니다');
  } catch {
    alert('로그아웃 중 오류가 발생했습니다.');
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (data.user) {
      return data.user;
    }
  } catch {
    alert('로그인한 유저를 찾을 수 없습니다.');
  }
};

export const insertUserData = async (userInfo) => {
  try {
    const { id, email, nickname } = userInfo;
    const { error } = await supabase.from('users').insert({
      id,
      created_at: new Date(),
      email,
      nickname
    });
    if (error) throw error;
  } catch {
    alert('회원 정보 저장 중 오류가 발생했습니다.');
  }
};

export const getUserInfo = async (userId) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId);
    if (error) throw error;
    if (data) {
      const { id, nickname } = data[0];
      return { id, nickname };
    }
  } catch {
    alert('유저 정보 조회 중 오류가 발생하였습니다.');
  }
};
