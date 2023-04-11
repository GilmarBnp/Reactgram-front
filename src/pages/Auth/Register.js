import "./Auth.css"
import PulseLoader from "react-spinners/PulseLoader";

// Components
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Redux 
import { register, reset } from "../../slices/authSlice"

import Message from "../../components/Message";

const Register = () => {
  const[name, setName]= useState("");
  const[email, setEmail]= useState("");
  const[gender, setGender]= useState("");
  const[password, setPassword]= useState("");
  const[confirmPassword, setConfirmPassword]=useState("");

  const dispatch = useDispatch()

  const { loading, error, } = useSelector((state) => state.auth)
  
  const handleSubmit = (e) => {
    e.preventDefault();  
    
    const user = {
      name,
      email,
      gender,
      password,
      confirmPassword,
    }
    console.log(user)

    dispatch(register(user));
  
  };

    // Clean all auth states
    useEffect(() => {
      dispatch(reset());
    },[dispatch])


    return (
      <div id="register">
          <h3>ReactGram</h3>
          <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
          <form onSubmit={handleSubmit}>
            <input  type="text" 
                    placeholder="Nome" 
                    value={name || ""}
                    onChange={(e)=>setName(e.target.value)}/>
            <input type="email" 
                   placeholder="E-mail" 
                   value={email || ""} 
                   onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" 
                   placeholder="Senha" 
                   value={password || ""} 
                   onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" 
                   placeholder="Confirme a senha" 
                   value={confirmPassword || ""} 
                   onChange={(e)=>setConfirmPassword(e.target.value)} />
            <div className="gender">
            <p className="ps">Sexo</p>
            <p><input 
            type="radio" 
            value= 'Masculino'
            onChange={(event)=>setGender(event.target.value)}
            required 
            name="sexo" 
            id="male"/>Masculino</p>
            <p><input 
            type="radio" 
            value= 'Feminino'
            onChange={(event)=>setGender(event.target.value)}
            name="sexo" 
            id="female"/>Feminino</p>
          </div>
            {!loading && <input type="submit" value="Cadastrar" />}
            {loading && <p><PulseLoader className="load" size={10} color="#0094f6" /></p>}
            {error && <Message msg= {error} type="error"/>}
          </form>
          <p>
            Já tem conta? <Link to={"/login"}>Clique aqui.</Link>
          </p>
      </div>
    )
  }
  
      
  export default Register