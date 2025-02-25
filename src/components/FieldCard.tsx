import styled from "styled-components";
import { FieldPlaceDataType, FieldPoinsColor } from "../data/gameFieldData";

type FieldCardPropsType = FieldPlaceDataType;

function FieldCard(props: FieldCardPropsType) {

    const getCurrentCardPosition = () => {
        if (props.id <= 11) {
            return {
                row: 1,
                column: props.id
            }
        }
        if (props.id > 11 && props.id <= 21) {
            return {
                row: props.id - 10,
                column: 11
            }
        }
        if (props.id > 21 && props.id <= 31) {
            return {
                row: 11,
                column: 11 - (props.id - 21)
            }
        }
        if (props.id > 31 && props.id <= 41) {
            return {
                row: 11 - (props.id - 31),
                column: 1
            }
        }
    }

  return (
    <FieldCardWrapper rowPlacement={getCurrentCardPosition()?.row} columnPlacement={getCurrentCardPosition()?.column}>
      {props.cardType === "common" && props.color ? (
        <FieldCardTop cardColor={props.color} />
      ) : undefined}

      <p>{props.cardTitle}</p>
    </FieldCardWrapper>
  );
}

const FieldCardWrapper = styled.div<{
  rowPlacement?: number;
  columnPlacement?: number;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;

  grid-row: ${(props) => props.rowPlacement ? `${props.rowPlacement}/${props.rowPlacement + 1}` : "1/2"};
  grid-column: ${(props) => props.columnPlacement ? `${props.columnPlacement}/${props.columnPlacement + 1}` : "1/2"};

  border: 1px solid black;

  overflow: hidden;
`;

const FieldCardTop = styled.div<{
  cardColor?: FieldPoinsColor;
}>`
  width: 100%;
  height: 50px;

  background-color: ${(props) => {
    switch (props.cardColor) {
      case "blue":
        return "blue";
        break;
      case "brown":
        return "brown";
        break;
      case "green":
        return "green";
        break;
      case "lightBlue":
        return "lightblue";
        break;
      case "orange":
        return "orange";
        break;
      case "purple":
        return "purple";
        break;
      case "red":
        return "red";
        break;
      case "yellow":
        return "yellow";
        break;
      default:
        return undefined;
        break;
    }
  }};
`;

export default FieldCard;
