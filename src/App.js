import './App.css';
import PulseLoader from "react-spinners/PulseLoader";

// Hooks
import { useAuth } from './hooks/useAuth';

// Router
import { BrowserRouter, Routes, Route, Navigate, Router} from "react-router-dom"
import Register from '../src/pages/Auth/Register';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import EditProfile from '../src/pages/EditProfile/EditProfile'
import Profile from './pages/Profile/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Photo from './pages/Photo/Photo';


function App() {
  
  const { auth, loading } = useAuth()
  
  if(loading) {
    return <p><PulseLoader size={10}/></p>;
  
  }else{
    return (
      <BrowserRouter>
      <Navbar />
      <div className="container">
      <Routes>
        <Route 
         path="/" 
         element={auth ? <Home/> : <Navigate to='/login'/>}/>
          <Route 
         path="/profile" 
         element={auth ? <EditProfile/> : <Navigate to='/login'/>}/>
        <Route 
         path="/users/:id" 
         element={auth ? <Profile/> : <Navigate to='/login'/>}/>
        <Route 
         path="/register" 
         element={!auth ? <Register/> : <Navigate to='/'/>} />
        <Route 
         path="/login" 
         element={!auth ? <Login/> : <Navigate to='/'/>}/>
         <Route path='/photos/:id' 
         element={auth ? <Photo/> : <Navigate to='/login/'/>}/>
      </Routes>
      </div>
      <Footer />
      </BrowserRouter>
    );
  }

  }

  export default App;

