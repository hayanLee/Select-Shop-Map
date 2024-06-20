import Swal from 'sweetalert2';
import supabase from '../supabase/supabaseClient';

export const isLikedShop = async ({ userId, shopId }) => {
  try {
    const { data, error } = await supabase.from('likes').select('*').eq('user_id', userId).eq('kakao_shop_id', shopId);
    if (error) throw error;
    return data.length ? true : false;
  } catch {
    Swal.fire('Error', '좋아요를 가져오는 중 오류가 발생하였습니다', 'error');
  }
};

export const addLike = async ({ userId, shopId, shop_name }) => {
  console.log(userId, shopId, shop_name);
  try {
    const { error } = await supabase.from('likes').insert({
      user_id: userId,
      kakao_shop_id: shopId,
      shop_name
    });

    if (error) throw error;
    Swal.fire('Success', '좋아요를 눌렀습니다!', 'success');
  } catch (err) {
    Swal.fire('Error', '좋아요 과정 중 오류가 발생하였습니다', 'error');
  }
};

export const deleteLike = async ({ userId, shopId }) => {
  console.log(userId, shopId);
  try {
    const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('kakao_shop_id', shopId);

    if (error) throw error;
    Swal.fire('Success', '좋아요를 취소하였습니다', 'success');
  } catch (err) {
    Swal.fire('Error', '좋아요를 취소중 오류가 발생하였습니다', 'error');
  }
};

export const getUserLikedShops = async (userId) => {
  try {
    const { data, error } = await supabase.from('likes').select('shop_name').eq('user_id', userId);
    if (error) throw error;
    return data;
  } catch (err) {
    Swal.fire('Error', '찜한 상점을 불러오는 중 오류가 발생하였습니다', 'error');
  }
};
