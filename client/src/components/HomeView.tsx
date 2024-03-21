import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import { Loader } from '.';
import useFetch from '../api';
import NotFoundImg from '../assets/not-fond.jpg';
import { UserProps } from '../interface';
import { useAppSelector } from '../redux/hooks';
import { headers } from '../utils/header';

const Homeview = () => {
  const { searchedData, isSidebarOpen, searchTerm } = useAppSelector((state) => state.users);
  const { loading, deletion } = useFetch();

  const deleteBtn = (val: string) => {
    deletion(val);
  };

  if (loading) return <Loader />;

  return (
    <div className={`${!isSidebarOpen ? 'mx-6' : 'mx-1'}`}>
      <div className="w-full">
        {searchedData.length === 0 ? (
          <>
            <div className="bg-white overflow-x-auto">
              <table className="w-min-full w-full mb-5">
                <thead>
                  <tr>
                    {headers.map((item: string, index: number) => (
                      <th
                        className="py-4 px-6 tracking-wider whitespace-no-wrap whitespace-nowrap"
                        key={index}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>

              <div className="flex items-center justify-center py-10 w-full">
                <div className="w-full">
                  <div className="flex justify-center items-center text-center text-lg text-gray-700">
                    <p className="capitalize">
                      {searchTerm ? `No user with this name: ${searchTerm}` : 'No users found'}
                    </p>
                  </div>
                  <div className="flex flex-row justify-center items-start">
                    <img className="h-72 w-72" src={NotFoundImg} alt="images" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-min-full w-full overflow-x-auto">
              <thead className="">
                <tr className="">
                  {headers.map((item: string, index: number) => (
                    <th
                      scope="col"
                      key={index}
                      className="py-4 px-6 tracking-wider border-1 border-grey-light text-left">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              {searchedData.map((item: UserProps, index: number) => (
                <tbody className="bg-white" key={index}>
                  <tr className="border-1 border-grey-light font-normal">
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      {item.firstName}
                    </td>
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      {item.lastName}
                    </td>
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      {item.phoneNumber}
                    </td>
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      {item.email}
                    </td>
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      {moment(item?.dateOfBirth).format('LL')}
                    </td>
                    <td className="px-6 py-3 whitespace-no-wrap whitespace-nowrap border-1 border-grey-light">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                        onClick={() => deleteBtn(item._id as string)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homeview;
