import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';

function App() {
  return (
    <Router>
      <div className='bg-[#F6EEC9] min-h-screen'>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <AddTask />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
