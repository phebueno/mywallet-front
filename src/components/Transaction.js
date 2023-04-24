import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../constants/urls.js";

export default function Transaction({ transacao, setListaTransacoes, listaTransacoes }) {
  const { _id: idTransacao, opDate, value, description, type } = transacao;
  const navigate = useNavigate();

  function deleteTransacao(idTransacao){
    const confirm = window.confirm("Deseja mesmo apagar esta entrada?");
    if(!confirm) return;
    const token = localStorage.getItem("userAuth");
    if (!token) return navigate("/");

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const url = `${BASE_URL}/transacao/${idTransacao}`;
    axios
      .delete(url, config)
      .then((res) => {
        console.log(res.data);
        const updatedListaTransacoes = listaTransacoes.data.filter(transacao=>transacao._id!==idTransacao);
        //Remove do fisicamente da página, remove a necessidade de esperar tempo de resposta da servidor
        setListaTransacoes({data:updatedListaTransacoes, update:true});     
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <ListItemContainer>
      <div>
        <span>{opDate}</span>
        <strong onClick={()=>navigate(`/editar-transacao/${type}`, {state:{idTransacao,value,description}})}>{description}</strong>
      </div>
      <div>
        <Value color={type}>
          {value.toFixed(2).toString().replace(".", ",")}
        </Value>
        <AiCloseStyle onClick={() => deleteTransacao(idTransacao)} />
      </div>
    </ListItemContainer>
  );
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  strong{
    cursor:pointer;
  }
  div {
    display: flex;
    gap: 10px;
  }
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;

const AiCloseStyle = styled(AiOutlineClose)`
cursor:pointer;
color:#c6c6c6;
`;
