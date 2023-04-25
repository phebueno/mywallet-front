import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/urls.js";
import axios from "axios";

export default function SignInPage({setUser}) {
  const [loginUsuario, setLoginUsuario] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("userAuth");
    if (token) return navigate("/home");
  })

  function handleChange(e) {
    setLoginUsuario({ ...loginUsuario, [e.target.name]: e.target.value });
  }
  function signin(e) {
    e.preventDefault();
    const url = `${BASE_URL}/sign-in`;
    axios
      .post(url, loginUsuario)
      .then((res) => {
        //Cria sessão com armazenamento local
        const {user,token} = res.data;
        const dadosSerializados = JSON.stringify(token); 
        localStorage.setItem("userAuth", dadosSerializados);
        setUser(user);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={signin}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          value={loginUsuario.name}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="password"
          value={loginUsuario.password}
          onChange={handleChange}
        />
        <button>Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
