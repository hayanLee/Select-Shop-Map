import supabase from '../supabase/supabaseClient';

export const addReview = async ({ userId, shopId, content }) => {
  try {
    const { error } = await supabase.from('reviews').insert({
      user_id: userId,
      shop_id: shopId,
      content
    });
    if (error) console.error('리뷰 등록 에러 :', error);

    alert('리뷰가 등록되었습니다');
  } catch (err) {
    alert('리뷰 등록 과정 중 오류가 발생했습니다');
  }
};

export const deleteReview = async ({ userId, shopId }) => {
  try {
    const { error } = await supabase.from('reviews').delete().eq('user_id', userId).eq('shop_id', shopId);
    if (error) console.error('리뷰 삭제 에러 :', error);

    alert('리뷰를 삭제하였습니다');
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
    if (error) console.error('리뷰 수정 에러 :', error);

    alert('리뷰를 수정하였습니다');
  } catch (err) {
    alert('리뷰 수정 중 오류가 발생하였습니다');
  }
};

export const getShopReviewsByShopId = async (shopId) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('shop_id', shopId);
    if (error) {
      console.log('shop reivews 가져오기 에러', error);
      return [];
    }
    if (data) {
      console.log(data);
    }
  } catch (err) {
    alert('리뷰를 가져오는 과정 중 오류가 발생했습니다');
  }
};

export const getUserReviewsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('user_id', userId);
    if (error) {
      console.log('user reivews 가져오기 에러', error);
      return [];
    }
    if (data) {
      console.log(data);
    }
  } catch (err) {
    alert('리뷰를 가져오는 과정 중 오류가 발생했습니다');
  }
};
