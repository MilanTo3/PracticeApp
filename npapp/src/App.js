import './App.css';
import { Routes ,Route } from 'react-router-dom';
import LogRegPage from './Pages/logregPage/logregPage';
import SearchAppBar from './Components/NavigationBar/navbar';
import ToiletAdmin from './Pages/toiletAdminPage/toiletAdmin';
import HomePage from './Pages/homePage/homePage';
import RatingPage from './Pages/ratingPage/ratingPage';

function App() {
  return (
    <div className="App">
      <SearchAppBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/logregPage" element={<LogRegPage />}/>
        <Route path="/toiletAdmin" element={<ToiletAdmin />}/>
        <Route path="/ratingPage" element={<RatingPage />} />
      </Routes>
    </div>
  );
}

export default App;
