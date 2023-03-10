import './App.css';
import { Routes ,Route, Navigate, Outlet } from 'react-router-dom';
import LogRegPage from './Pages/logregPage/logregPage';
import SearchAppBar from './Components/NavigationBar/navbar';
import ToiletAdmin from './Pages/toiletAdminPage/toiletAdmin';
import HomePage from './Pages/homePage/homePage';
import RatingPage from './Pages/ratingPage/ratingPage';
import BadRatingPage from './Pages/badRatingPage/badRatingPage';
import ThankYouPage from './Pages/thankYouPage/thankYouPage';
import ReportsPage from './Pages/reportsPage/reportsPage';
import { useState } from 'react';

function App() {

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [staffAuth, setStaffAuth] = useState((loggedUser && (loggedUser.role === "staff")) ? true:false);
  const [adminAuth, setAdminAuth] = useState((loggedUser && (loggedUser.role === "admin")) ? true:false);

  return (
    <div className="App">
      <SearchAppBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/logregPage" element={<LogRegPage />} />
        <Route path="/toiletAdmin" element={<ToiletAdmin />} />
        <Route path="/ratingPage" element={<RatingPage />} />
        <Route path="/badRatingPage" element={<BadRatingPage />} />
        <Route path="/thankYouPage" element={<ThankYouPage />} />
        <Route path="/reportsPage" element={<ReportsPage />} />
      </Routes>
    </div>
  );
}

export default App;
