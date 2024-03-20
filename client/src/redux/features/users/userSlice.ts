import { createSlice } from '@reduxjs/toolkit';
import { IIProps } from '../../../interface';

const initialState: IIProps = {
  loading: true,
  searchTerm: '',
  isSidebarOpen: false,
  searchedData: [],
};

export const userSlice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload;
    },

    openSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchedData: (state, action) => {
      state.searchedData = action.payload;
    },
  },
});

export const { setLoader, openSidebar, setSearchTerm, setSearchedData } = userSlice.actions;

export default userSlice.reducer;
