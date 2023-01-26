import './App.css';
import { Routes ,Route } from 'react-router-dom';
import LogRegPage from './Pages/logregPage/logregPage';
import SearchAppBar from './Components/NavigationBar/navbar';

function App() {
  return (
    <div className="App">
      <SearchAppBar/>
      <Routes>
        <Route path="/" element={<div></div>}/>
        <Route path="/logregPage" element={<LogRegPage />}/>
      </Routes>
    </div>
  );
}

export default App;
