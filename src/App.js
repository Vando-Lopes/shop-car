import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';
import NavBar from '../src/components/NavBar/NavBar'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
