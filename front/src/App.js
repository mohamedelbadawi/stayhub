import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './pages/Layout';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import GuestRoute from './hooks/GuestRoute';
import AuthRoute from './hooks/AuthRoute';
import Profile from './pages/Profile';
import Account from './pages/Account';
import UserBookings from './pages/UserBookings';
import UserAccommodations from './pages/UserAccommodations';
import AccommodationForm from './components/AccommodationForm';
import PlaceDetails from './pages/PlaceDetails';
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<GuestRoute />}>
            <Route path='' index element={<Home />} />
            <Route path='/place/:id' element={<PlaceDetails />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forget-password' element={<ForgetPassword />} />
            <Route path='reset-password/:id' element={<ResetPassword />} />
          </Route>

          <Route element={<AuthRoute />}>
            <Route path='/account' element={<Account />} >
              <Route path='' index element={<Profile />} />
              <Route path='bookings' element={<UserBookings />} />
              <Route path='accommodations' element={<UserAccommodations />} />
              <Route path='accommodations/add' element={<AccommodationForm />} />
              <Route path='accommodations/:id' element={<AccommodationForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
