import './App.css';
import Signin from './components/Signin';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/Signin" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
