import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { BASE_URL } from "../constants/urls.js";
import axios from "axios";

export default function SignInPage() {
  const [loginUsuario, setLoginUsuario] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
        const dadosSerializados = JSON.stringify(res.data); // String '{"nome":"Pedro","idade":30}'
        localStorage.setItem("userAuth", dadosSerializados);
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
