import useFetch from '../api';

const Homeview = () => {
  const { loading, usersData } = useFetch();

  console.log(loading);
  console.log(usersData);

  return <div>Homeview</div>;
};

export default Homeview;
