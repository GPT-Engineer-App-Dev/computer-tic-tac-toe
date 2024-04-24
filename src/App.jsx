import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;
