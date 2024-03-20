import { createSlice } from '@reduxjs/toolkit';
import { IIProps } from '../../../interface';

const initialState: IIProps = {
  loading: true,
  searchTerm: '',
  isSidebarOpen: false,
  searchedData: [],
  dateFrom: '',
  dateTo: '',
  page: 1,
  pageSize: 5,
  numberOfPages: 0,
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
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setNumberOfPages: (state, action) => {
      state.numberOfPages = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setLoader,
  openSidebar,
  setSearchTerm,
  setSearchedData,
  setDateFrom,
  setDateTo,
  setPage,
  setNumberOfPages,
  setPageSize,
} = userSlice.actions;

export default userSlice.reducer;
