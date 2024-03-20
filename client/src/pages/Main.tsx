import { HeroHeader, HomeView, DateFilters, Pagination } from '../components';

const MainPage = () => {
  return (
    <div>
      <HeroHeader type="user-view" />
      <DateFilters />
      <HomeView />
      <Pagination />
    </div>
  );
};

export default MainPage;
