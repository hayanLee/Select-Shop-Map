import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    savedShops: [],
    reviews: [],
  },
  reducers: {
    setSavedShops(state, action) {
      state.savedShops = action.payload;
    },
    addSavedShop(state, action) {
      state.savedShops.push(action.payload);
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    addReview(state, action) {
      state.reviews.push(action.payload);
    },
  },
});

export const { setSavedShops, addSavedShop, setReviews, addReview } = shopSlice.actions;

export default shopSlice.reducer;
