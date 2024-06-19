import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase/supabaseClient';

// 유저 정보 가져오기
const fetchUserInfo = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
};

export const useUserInfo = (userId) => {
  return useQuery(['userInfo', userId], () => fetchUserInfo(userId), {
    enabled: !!userId,
  });
};

// 리뷰 리스트 가져오기
const fetchReviews = async (userId) => {
  const { data, error } = await supabase.from('reviews').select('id, content, created_at').eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const useReviews = (userId) => {
  return useQuery(['reviews', userId], () => fetchReviews(userId), {
    enabled: !!userId,
  });
};

// 로그인
const loginWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(loginWithEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries('userInfo');
    },
  });
};

// 회원가입
const signUpWithEmail = async ({ email, password, nickname }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  if (data.user) {
    const { id, email } = data.user;
    const { error: insertError } = await supabase.from('users').insert({
      id,
      created_at: new Date(),
      email,
      nickname,
    });
    if (insertError) throw insertError;
  }
  return data.user;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(signUpWithEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries('userInfo');
    },
  });
};
