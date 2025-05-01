import './App.css';

import NavBar from './components/NavBar';
import BookDisplay from './components/BookDisplay';
import BookSearch from './components/BookSearch';
import Favorites from './components/Favorites';
import Purchased from './components/Purchased'
import Login from './components/Login';
import Listings from './components/Listings';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div className='container'>
        <Routes>
          <Route path='/' element={<BookSearch />} />
          <Route path='/bookSearch' element={<BookSearch />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/logIn' element={<Login />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/purchased' element={<Purchased />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
