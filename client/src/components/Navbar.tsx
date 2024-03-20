import searchSvg from '../assets/search.svg';
import toggleSvg from '../assets/toggle.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NavProfile } from '.';
import useFetch from '../api';

import {
  openSidebar,
  setLoader,
  setSearchTerm,
  setSearchedData,
} from '../redux/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserProps } from '../interface';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { usersData } = useFetch();
  const { isSidebarOpen } = useAppSelector((state) => state.users);
  const [value, setValue] = useState('');

  const handleChange = () => {
    if (!value) {
      dispatch(setSearchedData(usersData.data));
    } else {
      let searchResult = new RegExp(`${value}`, 'gi');
      if (usersData && usersData.data.length > 0) {
        const newSearchData = usersData.data.filter(
          (item: UserProps) =>
            item.firstName.match(searchResult) || item.lastName.match(searchResult)
        );
        dispatch(setSearchedData(newSearchData));
      }
      dispatch(setSearchTerm(value));
    }
  };

  return (
    <div className="w-full h-[55px] relative bg-[#222]">
      <div
        className={`main-container flex flex-row ${
          !isSidebarOpen ? 'justify-start' : 'justify-between'
        } items-center`}>
        <Link
          to="/"
          onClick={() => dispatch(setLoader(true))}
          className="w-72 h-[55px]"
          style={{ fontFamily: 'Lobster Two' }}>
          <h1
            className={`text-gray-50 text-3xl font-bold pt-2.5 ${
              !isSidebarOpen ? 'ml-5' : 'ml-0'
            }`}>
            Expatswap
          </h1>
        </Link>
        <div
          className={`ml-20 md:ml-30 flex justify-between items-center w-full ${
            !isSidebarOpen ? 'block' : 'hidden'
          }`}>
          <div className="relative">
            <input
              onKeyUp={handleChange}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search name..."
              className="w-[250px] md:w-[500px] h-[27px] rounded-[4px] bg-white outline-none px-3"
            />
            <div className="absolute top-[50%] right-[10px] translate-y-[-50%]">
              <img src={searchSvg} alt="search" className=" h-4 w-4 text-[#222]" />
            </div>
          </div>
          <div>
            <NavProfile />
          </div>
        </div>

        <div
          className={`cursor-pointer ${!isSidebarOpen ? 'hidden' : 'block'}`}
          onClick={() => dispatch(openSidebar(true))}>
          <img src={toggleSvg} alt="search" className=" h-8 w-8 text-[#222]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
