import styled from "styled-components";
import { useAppSelector } from "../hooks";
import FieldCard from "./FieldCard";

function GameField() {
  const cardsData = useAppSelector((state) => state.gameFieldPoints);
//   const dispatch = useAppDispatch();

  const cardsRenderer = () => {
    return cardsData.map((item) => {
        if (item.cardType === "common" && item.color) {
            return <FieldCard key={item.id} id={item.id} cardTitle={item.cardTitle} cardType={item.cardType} color={item.color} />
        }
    })
  }

  return <FieldWrapper>
    {cardsRenderer()}
  </FieldWrapper>;
}

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(9, 1fr) 200px;
  grid-template-rows: 200px repeat(9, 110px) 200px;

  margin: 12px;
  border-radius: 16px;

  background-color: #b6b6b6;
  overflow: hidden;
`;

export default GameField;