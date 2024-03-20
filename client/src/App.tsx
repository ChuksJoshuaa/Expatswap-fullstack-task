import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout, Navbar, Footer } from './components';
import { Error, Main, Create } from './pages';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create-user" element={<Create />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  );
};

export default App;
