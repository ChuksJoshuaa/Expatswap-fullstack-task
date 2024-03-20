import { setPage, setPageSize } from '../redux/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PageData } from '../utils/header';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { page, numberOfPages, isSidebarOpen } = useAppSelector((state) => state.users);

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNextPage = () => {
    if (page < numberOfPages) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <div
      className={`mt-10 flex justify-between items-center flex-wrap ${!isSidebarOpen ? 'mx-6' : 'mx-1'}`}>
      <div className="mb-4">
        <select
          onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent">
          {PageData.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`mb-4 px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}>
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === numberOfPages}
          className={`px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
