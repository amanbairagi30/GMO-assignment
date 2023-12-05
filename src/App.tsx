import './App.css'
import ProtectedRoute from './components/ProtectedRoute';
import Collection from './pages/Collections/Collection';
import Register from './pages/Register/Register'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/departments" element={<ProtectedRoute>{<Collection />}</ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
