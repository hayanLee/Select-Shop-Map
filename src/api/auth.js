import Swal from 'sweetalert2';
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
      Swal.fire('Success', '회원가입에 성공하였습니다!', 'success');
    }
  } catch (error) {
    console.error('회원가입 중 오류가 발생했습니다:', error.message);
    Swal.fire('Error', '회원가입 중 오류가 발생했습니다.', 'error');
  }
};

//로그인 시도
export const loginWithEmail = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password }); //🔥
    if (error) throw error;
    if (data && data.user) {
      Swal.fire('Success', '로그인에 성공하였습니다.', 'success');
      localStorage.clear();
      return await getUserInfo(data.user.id);
    }
  } catch (error) {
    console.error('로그인 중 오류가 발생하였습니다:', error.message);
    Swal.fire('Error', '로그인 중 오류가 발생하였습니다.', 'error');
  }
  return null;
};

//로그아웃
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    Swal.fire('Success', '로그아웃 되었습니다.', 'success');
    localStorage.clear();
  } catch (error) {
    console.error('로그아웃 중 오류가 발생했습니다:', error.message);
    Swal.fire('Error', '로그아웃 중 오류가 발생했습니다.', 'error');
  }
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
    Swal.fire('Error', '유저 정보 조회 중 오류가 발생하였습니다.', 'error');
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
    Swal.fire('Error', '유저 정보 조회 중 오류가 발생하였습니다.', 'error');
  }
  return null;
};

export const isEmailRegistered = async ({ email }) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('email', email);
    if (error) throw error;

    if (data.length > 0) {
      Swal.fire('Info', '이미 가입된 이메일입니다.', 'info');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('이메일 확인 중 오류가 발생하였습니다:', error.message);
    Swal.fire('Error', '이메일 확인 중 오류가 발생하였습니다.', 'error');
  }
};
