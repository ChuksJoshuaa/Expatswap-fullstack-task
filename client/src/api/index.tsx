import { useEffect, useState } from 'react';
import { AllUsersProps } from '../interface';
import {
  setNumberOfPages,
  setPage,
  setSearchedData,
  setUserId,
} from '../redux/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { serverUrl } from '../utils/route';
import { SuccessNotifier } from '../utils/Notification';

const useFetch = () => {
  const dispatch = useAppDispatch();
  const [usersData, setUsersData] = useState({} as AllUsersProps);
  const [loading, setLoading] = useState(false);
  const { dateFrom, dateTo, page, pageSize, userId } = useAppSelector((state) => state.users);

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

  const deletion = async (val: string) => {
    try {
      await fetch(`${serverUrl}/api/v1/users/delete/${val}`, {
        method: 'DELETE',
      });
      SuccessNotifier('User deleted successfully');
      dispatch(setUserId(val));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, [dateFrom, dateTo, page, pageSize, userId]);

  return {
    usersData,
    loading,
    deletion,
  };
};

export default useFetch;
