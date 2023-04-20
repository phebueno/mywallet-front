import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/urls.js";
import axios from "axios";
import Transaction from "../components/Transaction.js";
//import Transactions from "../components/Transactions.js";

export default function HomePage() {
  const [listaTransacoes, setListaTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate();

  function somarSaldo(accumulator, transacaoAtual) {
    let sinal = transacaoAtual.type === "entrada" ? 1 : -1;
    return accumulator + sinal * transacaoAtual.value;
  }

  useEffect(() => {
    const token = localStorage.getItem("userAuth");
    if (!token) return navigate("/");

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };

    const url = `${BASE_URL}/transacoes`;
    axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        setListaTransacoes(res.data);
        let initialValue = 0;
        const saldoTotal = res.data.reduce(
          (accumulator, transacaoAtual) =>
            somarSaldo(accumulator, transacaoAtual),
          initialValue
        );
        setSaldo(saldoTotal);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [navigate]);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit />
      </Header>
      <TransactionsContainer>
        <ul>
          {listaTransacoes.length !== 0 ? (
            listaTransacoes.map((transacao, index) => (
              <Transaction key={index} transacao={transacao} />
            ))
          ) : (
            <Aviso>Não há registro de entrada ou saída</Aviso>
          )}
        </ul>

        {listaTransacoes.length !== 0 ? (
          <article>
            <strong>Saldo</strong>
            <Value color={saldo > 0 ? "entrada" : "saida"}>
              {Math.abs(saldo).toFixed(2).toString().replace(".", ",")}
            </Value>
          </article>
        ) : (
          ""
        )}
      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const Aviso = styled.div`
  color: #868686;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  position: relative;
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
