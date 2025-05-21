import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Content from './pages/Content';
import Users from './pages/Users';
import UserView from './pages/UserView';
import Faqs from './pages/Faqs';
import { ToastContainer } from 'react-toastify';
import Properties from './pages/Properties';
import PropertyView from './pages/PropertyView';
import Banners from './pages/Banners';
import Sales from './pages/Sales';
import SaleView from './pages/SaleView';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='faqs' element={<Faqs />} />
          <Route path='banners' element={<Banners />} />
          <Route path='content' element={<Content />} />
          <Route path='users' element={<Users />} />
          <Route path='properties' element={<Properties />} />
          <Route path='sales' element={<Sales />} />
          <Route path='users/view' element={<UserView />} />
          <Route path='property/view' element={<PropertyView />} />
          <Route path='sale/view' element={<SaleView />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition:Zoom
      />
    </>
  );
}

export default App;
