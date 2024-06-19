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
      await insertUserData({ id, email, nickname });
      alert('회원가입에 성공하였습니다!');
    }
  } catch (error) {
    console.error('회원가입 중 오류가 발생했습니다:', error.message);
    alert('회원가입 중 오류가 발생했습니다.');
  }
};

//로그인 시도
export const loginWithEmail = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data && data.user) {
      alert('로그인에 성공하였습니다.');
      return await getUserInfo(data.user.id);
    }
  } catch (error) {
    console.error('로그인 중 오류가 발생하였습니다:', error.message);
    alert('로그인 중 오류가 발생하였습니다.');
  }
  return null;
};

//로그아웃
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    alert('로그아웃 되었습니다.');

    // 로컬 스토리지에서 사용자 정보 삭제
    localStorage.removeItem('userInfo');
    localStorage.removeItem('sb-qqfwyfugvnciounpkmfi-auth-token');
    window.dispatchEvent(new Event('storage')); // 상태 변경을 트리거하여 다른 컴포넌트가 변경을 감지할 수 있게 함
  } catch (error) {
    console.error('로그아웃 중 오류가 발생했습니다:', error.message);
    alert('로그아웃 중 오류가 발생했습니다.');
  }
};


//로그인 한 사용자 정보 가져오기
export const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (data.user) {
      return data.user;
    }
  } catch (error) {
    console.error('로그인한 유저를 찾을 수 없습니다:', error.message);
    alert('로그인한 유저를 찾을 수 없습니다.');
  }
  return null;
};

//db테이블에 사용자 데이터 삽입
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
  } catch (error) {
    console.error('회원 정보 저장 중 오류가 발생했습니다:', error.message);
    alert('회원 정보 저장 중 오류가 발생했습니다.');
  }
};

//특정 사용자의 추가 정보 가져오기
export const getUserInfo = async (userId) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId);
    if (error) throw error;
    if (data && data.length > 0) {
      const { id, nickname } = data[0];
      return { id, nickname };
    }
  } catch (error) {
    console.error('유저 정보 조회 중 오류가 발생하였습니다:', error.message);
    alert('유저 정보 조회 중 오류가 발생하였습니다.');
  }
  return null;
};
