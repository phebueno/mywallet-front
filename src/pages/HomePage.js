import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/urls.js";
import axios from "axios";
import Transaction from "../components/Transaction.js";

export default function HomePage({user, setUser}) {
  const [listaTransacoes, setListaTransacoes] = useState({data:"",update:false});
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
        setListaTransacoes({"data":res.data.opsUser, "update":false});
        setUser(res.data.user);
        const saldoTotal = res.data.opsUser.reduce(
          (accumulator, transacaoAtual) =>
            somarSaldo(accumulator, transacaoAtual),
          0
        );
        setSaldo(saldoTotal);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [navigate, listaTransacoes.update, setUser]);

  function logout(){
    localStorage.removeItem("userAuth");
    navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>{user && `Olá, ${user}`}</h1>
        <BiExitStyle onClick={logout}/>
      </Header>
      <TransactionsContainer>
        <ul>
          {listaTransacoes.data.length !== 0 ? (
            listaTransacoes.data.map((transacao, index) => (
              <Transaction key={index} transacao={transacao} setListaTransacoes={setListaTransacoes} listaTransacoes={listaTransacoes}/>
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
        <button onClick={()=>navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button onClick={()=>navigate("/nova-transacao/saida")}>
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
  ul{
    overflow-y: auto;
    max-height:350px;
  }
  
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
const BiExitStyle = styled(BiExit)`
cursor:pointer;
`;
