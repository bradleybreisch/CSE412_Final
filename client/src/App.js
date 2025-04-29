import './App.css';

import NavBar from './components/NavBar';
import BookDisplay from './components/BookDisplay';
import BookSearch from './components/BookSearch';
import Favorites from './components/Favorites';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <BookSearch></BookSearch>
      <BookDisplay></BookDisplay>
      <Favorites></Favorites>
    </div>
  );
}

export default App;
