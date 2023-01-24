import './App.css';
import { Routes ,Route } from 'react-router-dom';
import LogRegPage from './Pages/logregPage/logregPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/logregPage" element={<LogRegPage />}/>
      </Routes>
    </div>
  );
}

export default App;
