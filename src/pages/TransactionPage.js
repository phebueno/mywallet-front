import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../constants/urls.js";

export default function TransactionsPage() {
  const [transacao, setTransacao] = useState({
    value: "",
    description: "",
  });
  const { tipo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userAuth");
    if (!token) return navigate("/");
  },[navigate])


  function handleChange(e) {
    const field = e.target.name;
    switch (field) {
      case "value":
        setTransacao({ ...transacao, [e.target.name]: Number(e.target.value) });
        break;

      default:
        setTransacao({ ...transacao, [e.target.name]: e.target.value });
        break;
    }
  }

  function addTransacao(e) {
    e.preventDefault();

    const token = localStorage.getItem("userAuth");
    if (!token) return navigate("/");

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };

    const url = `${BASE_URL}/nova-transacao/${tipo}`;

    axios
      .post(url, transacao, config)
      .then((res) => {
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data);
      });
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={addTransacao}>
        <input
          placeholder="Valor"
          type="number"
          name="value"
          pattern="[0-9]*"
          value={transacao.value}
          onChange={handleChange}
        />
        <input
          placeholder="Descrição"
          type="text"
          name="description"
          value={transacao.description}
          onChange={handleChange}
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
