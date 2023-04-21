import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { BASE_URL } from "../constants/urls.js";

export default function SignUpPage() {
  const [cadastroUsuario, setCadastroUsuario] = useState({
    name: "",
    email: "",
    password: "",
    refpassword: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setCadastroUsuario({ ...cadastroUsuario, [e.target.name]: e.target.value });
  }

  function signup(e) {
    e.preventDefault();
    if (cadastroUsuario.refpassword !== cadastroUsuario.password) {
      return alert("As senhas diferem. Tente novamente.");
    } else {
      const url = `${BASE_URL}/sign-up`;
      const {refpassword:_, ...cadastroLimpo} = cadastroUsuario;
      axios
        .post(url, cadastroLimpo)
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={signup}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          name="name"
          value={cadastroUsuario.name}
          onChange={handleChange}
        />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          value={cadastroUsuario.email}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="password"
          value={cadastroUsuario.password}
          onChange={handleChange}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="ref-new-password"
          name="refpassword"
          value={cadastroUsuario.refpassword}
          onChange={handleChange}
        />
        <button>Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
