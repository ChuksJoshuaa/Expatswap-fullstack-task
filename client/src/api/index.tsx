import { useEffect, useState } from 'react';
import { AllUsersProps } from '../interface';
import { serverUrl } from '../utils/route';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchedData, setPage, setNumberOfPages } from '../redux/features/users/userSlice';

const useFetch = () => {
  const dispatch = useAppDispatch();
  const [usersData, setUsersData] = useState({} as AllUsersProps);
  const [loading, setLoading] = useState(false);
  const { dateFrom, dateTo, page, pageSize } = useAppSelector((state) => state.users);

  const getFetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      let url = `${serverUrl}/api/v1/users/filtered?page=${page}&pageSize=${pageSize}&startDate=${dateFrom}&endDate=${dateTo}`;
      const response = await fetch(url);
      const resp = await response.json();
      if (resp && resp.data) {
        setUsersData(resp);
        dispatch(setSearchedData(resp.data));
        dispatch(setPage(resp.currentPage as number));
        dispatch(setNumberOfPages(resp.numberOfPages));
      } else setUsersData({} as AllUsersProps);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFetchData();
  }, [dateFrom, dateTo, page, pageSize]);

  return {
    usersData,
    loading,
  };
};

export default useFetch;
