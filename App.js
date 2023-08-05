
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Movies from "./components/englishmovies"
import Start from './components/Start';

function App() {
  return (
    <div className="App">
      <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/movies' element={<Movies />} />

          
        </Routes>

      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
