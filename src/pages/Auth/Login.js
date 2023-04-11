import "./Auth.css"
import PulseLoader from "react-spinners/PulseLoader";

// Components
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { login, reset } from "../../slices/authSlice"
import Message from "../../components/Message";

function refreshPage() {
  window.location.reload();
}

const Login = () => {

  const[email, setEmail]= useState();
  const[password, setPassword]= useState();

  const dispatch = useDispatch()
  
  const { loading, error } = useSelector((state) => state.auth)
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    }
    dispatch(login(user));

  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  },[dispatch])

  return (
    <div id="login">
    <h3>ReactGram</h3>
    <p className="subtitle">Logue-se para ver as fotos dos seus amigos.</p>
    <form onSubmit={handleSubmit}>
      <input 
      type="email" 
      placeholder="E-mail" 
      value={email || ""} 
      onChange={(e)=> setEmail(e.target.value)}/>
      <input 
      type="password" 
      placeholder="Senha" 
      value={password || ""} 
      onChange={(e)=> setPassword(e.target.value)}/>
      {!loading && <input type="submit" value="Entrar" />}
      {loading && <p><PulseLoader className="load" size={10} color="#0094f6" /></p>}
      {error && <p><Message msg= {error} type="error"/></p>}
    </form>
    <p>
      Ainda não tem um conta? <Link to={"/register"}>Clique aqui.</Link>
    </p>
</div>
)
}

export default Login