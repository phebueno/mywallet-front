import styled from "styled-components";

export default function Transaction({transacao}){
    const {_id:idTransacao,value,description,type} = transacao;
    console.log(transacao);
    return(
        <ListItemContainer>
            <div>
              <span>{idTransacao}</span>
              <strong>{description}</strong>
            </div>
            <Value color={type}>{value.toFixed(2).toString().replace('.',',')}</Value>
          </ListItemContainer>
    )
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
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;