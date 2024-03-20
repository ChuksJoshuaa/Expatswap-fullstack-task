import { Link, useNavigate } from 'react-router-dom';
import arrowRightSvg from '../assets/arrowRight.svg';
import dashboardSvg from '../assets/dashboard.svg';
import { HeaderProps } from '../interface';
import { useAppSelector } from '../redux/hooks';

const Header = ({ type }: HeaderProps) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { isSidebarOpen } = useAppSelector((state) => state.users);
  return (
    <div
      className={`flex flex-wrap justify-between items-center mt-5 py-5 ${
        !isSidebarOpen ? 'mx-6' : 'mx-1'
      }`}>
      <div
        className={`mb-2 flex justify-start items-center ${!isSidebarOpen ? 'ml-[1em]' : 'ml-0'}`}>
        <img src={dashboardSvg} alt="dashboard" className="w-[20px] h-[20px]" />
        <img src={arrowRightSvg} alt="arrow-right" className="w-[20px] h-[20px] mx-2" />
        <h3 className="font-bold text-[14px] md:text-[17px] leading-[20px] text-[#222]">
          {type === 'user-view' ? 'All Users Record' : 'Create User'}
        </h3>
      </div>
      {type === 'user-view' ? (
        <div className="flex justify-center ">
          <Link
            to={`/create-user`}
            className="rounded-[6px] bg-[#222] py-[5px] px-[10px] gap-[5px] flex items-center cursor-pointer">
            <h3 className="text-white  text-[12px] sm:text-[14px] leading-[24px] font-normal">
              Create User
            </h3>
          </Link>
        </div>
      ) : (
        <button
          onClick={() => {
            goBack();
          }}
          className="rounded-[6px] bg-[#222] py-[5px] px-[10px] gap-[5px] flex items-center cursor-pointer">
          <h3 className="text-white text-[14px] leading-[24px] font-normal">Go back</h3>
        </button>
      )}
    </div>
  );
};

export default Header;
