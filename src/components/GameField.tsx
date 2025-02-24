import styled from "styled-components";
import FieldCard from "./FieldCard";

function GameField() {
  return (
    <GameFieldWrapper>
      <GameFieldFlex
        direction="row"
        fieldPosition="top"
      >
        <FieldCard
          color="red"
          title="Free Parking"
          price={123}
          cardType="parking"
        />
        <FieldCard
          color="red"
          title="Kentucky Avenue"
          price={220}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
      </GameFieldFlex>
      <GameFieldFlex
        direction="column"
        fieldPosition="right"
      >
        <FieldCard
          color="red"
          title="In jail"
          price={123}
          cardType="jail"
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
      </GameFieldFlex>
      <GameFieldFlex
        direction="row-reverse"
        fieldPosition="bottom"
      >
        <FieldCard
          color="red"
          title="Salary"
          price={123}
          cardType="start"
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
        />
      </GameFieldFlex>
      <GameFieldFlex
        direction="column-reverse"
        fieldPosition="left"
      >
        <FieldCard
          color="red"
          title="In jail"
          price={123}
          cardType="jail"
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
        <FieldCard
          color="red"
          title="Название карточки"
          price={123}
          isSide={true}
        />
      </GameFieldFlex>
    </GameFieldWrapper>
  );
}

const GameFieldWrapper = styled.div`
  width: 150rem;
  height: auto;
  aspect-ratio: 1/1;
  background-color: #cdebd3;
  position: relative;
`;

const GameFieldFlex = styled.div<{
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  fieldPosition: "top" | "right" | "bottom" | "left";
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 0;

  position: absolute;
  top: ${(props) =>
    props.fieldPosition === "top" ||
    props.fieldPosition === "right"
      ? "0"
      : "unset"};
  bottom: ${(props) =>
    props.fieldPosition === "bottom" ||
    props.fieldPosition === "left"
      ? "0"
      : "unset"};
  right: ${(props) =>
    props.fieldPosition === "right" ||
    props.fieldPosition === "bottom"
      ? "0"
      : "unset"};
  left: ${(props) =>
    props.fieldPosition === "left" ||
    props.fieldPosition === "top"
      ? "0"
      : "unset"};
`;

export default GameField;
