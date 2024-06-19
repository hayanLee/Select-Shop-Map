import supabase from '../supabase/supabaseClient';

// 🔥
export const addReview = async ({ userId, shopId, content }) => {
  try {
    const { error } = await supabase.from('reviews').insert({
      user_id: userId,
      shop_id: shopId,
      content
    });

    if (error) throw error;
    alert('리뷰가 등록되었습니다');
  } catch (err) {
    alert('리뷰 등록 과정 중 오류가 발생했습니다');
  }
};

export const deleteReview = async ({ userId, shopId }) => {
  try {
    const { error } = await supabase.from('reviews').delete().eq('user_id', userId).eq('shop_id', shopId);

    if (error) throw error;
    if (confirm('정말 삭제하시겠습니까?')) alert('리뷰를 삭제하였습니다');
  } catch (err) {
    alert('리뷰 삭제 중 오류가 발생하였습니다');
  }
};

export const modifyReview = async ({ userId, shopId, content }) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .update({
        content
      })
      .eq('user_id', userId)
      .eq('shop_id', shopId);

    if (error) throw error;
    alert('리뷰를 수정하였습니다');
  } catch (err) {
    alert('리뷰 수정 중 오류가 발생하였습니다');
  }
};

export const getShopReviewsByShopId = async (shopId) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('shop_id', shopId);
    if (error) throw error;
    if (data) return data;
  } catch (err) {
    alert('리뷰를 가져오는 과정 중 오류가 발생했습니다');
  }
};

export const getUserReviewsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('user_id', userId);
    if (error) throw error;
    if (data) return data;
  } catch (err) {
    alert('리뷰를 가져오는 과정 중 오류가 발생했습니다');
  }
};
