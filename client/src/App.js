
import './App.css';
import HomePage from './pages/HomePage';

import {Route,Routes} from 'react-router-dom'

import EditUser from './pages/EditUser';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}>

        </Route>
        <Route path='/edit/:id' element={ <EditUser/>} />
      </Routes>
      
    </div>
  );
}

export default App;
