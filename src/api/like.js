import supabase from '../supabase/supabaseClient';

export const addLike = async (userId, shopId) => {
  try {
    const { error } = await supabase.from('likes').insert({
      user_id: userId,
      kakao_shop_id: shopId
    });
    if (error) console.error('addLike 에러 :', error);

    alert('좋아요를 눌렀습니다!');
  } catch (err) {
    alert('좋아요 과정 중 오류가 발생하였습니다');
  }
};

export const deleteLike = async (userId, shopId) => {
  try {
    const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('kakao_shop_id', shopId);
    if (error) console.error('deleteLike 에러 :', error);

    alert('좋아요를 취소하였습니다');
  } catch (err) {
    alert('좋아요를 취소중 오류가 발생하였습니다');
  }
};
