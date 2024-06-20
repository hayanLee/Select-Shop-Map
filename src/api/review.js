import supabase from '../supabase/supabaseClient';
import Swal from 'sweetalert2';

// 리뷰 추가 함수
export const addReview = async ({ userId, shopId, content }) => {
  try {
    const { error } = await supabase.from('reviews').insert({
      user_id: userId,
      shop_id: shopId,
      content
    });

    if (error) throw error;
    Swal.fire('Success', '리뷰가 등록되었습니다', 'success');
  } catch (err) {
    Swal.fire('Error', '리뷰 등록 과정 중 오류가 발생했습니다', 'error');
  }
};

// 리뷰 삭제 함수
export const deleteReview = async (reviewId) => {
  try {
    const result = await Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) throw error;
      Swal.fire('Success', '리뷰를 삭제하였습니다', 'success');
    }
  } catch (err) {
    Swal.fire('Error', '리뷰 삭제 중 오류가 발생하였습니다', 'error');
  }
};

// 리뷰 수정 함수
export const modifyReview = async ({ reviewId, content }) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .update({
        content
      })
      .eq('id', reviewId);

    if (error) throw error;
    Swal.fire('Success', '리뷰를 수정하였습니다', 'success');
  } catch (err) {
    Swal.fire('Error', '리뷰 수정 중 오류가 발생하였습니다', 'error');
  }
};

// 특정 가게의 리뷰 가져오기 함수
export const getShopReviewsByShopId = async (shopId) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('shop_id', shopId);
    if (error) throw error;
    return data;
  } catch (err) {
    Swal.fire('Error', '리뷰를 가져오는 과정 중 오류가 발생했습니다', 'error');
  }
};

// 특정 유저의 리뷰 가져오기 함수
export const getUserReviewsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (err) {
    Swal.fire('Error', '리뷰를 가져오는 과정 중 오류가 발생했습니다', 'error');
  }
};
