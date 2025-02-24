import styled from "styled-components";

type FiledCardVariantTypes =
  | "parking"
  | "chance"
  | "jail"
  | "start"
  | "chest";

type FiledCardColorsTypes =
  | "red"
  | "yellow"
  | "green"
  | "darkblue"
  | "brown"
  | "lightblue"
  | "purple"
  | "orange";

type FiledCardPropsTypes = {
  color: FiledCardColorsTypes;
  title: string;
  price: number;

  cardType?: FiledCardVariantTypes;
  isSide?: boolean;
};

function FieldCard(props: FiledCardPropsTypes) {
  switch (props.cardType) {
    case "parking":
      return (
        <CardWrapper variant={"corner"}>
          <CardText>{props.title}</CardText>
        </CardWrapper>
      );
      break;
    case "jail":
      return (
        <CardWrapper variant={"corner"}>
          <CardText>{props.title}</CardText>
        </CardWrapper>
      );
      break;
    case "start":
      return (
        <CardWrapper variant={"corner"}>
          <CardText>{props.title}</CardText>
        </CardWrapper>
      );
      break;
    case "chance":
      return undefined;
      break;
    default:
      return (
        <CardWrapper isSide={props.isSide}>
          {/* <CardTop color={props.color} />
          <CardText>{props.title}</CardText>
          <CardPrice>{props.price} $</CardPrice> */}
        </CardWrapper>
      );
  }
}

const CardWrapper = styled.div<{
  variant?: string;
  isSide?: boolean;
}>`
  position: relative;
  background-color: transparent;
  width: ${(props) =>
    props.variant === "corner" || props.isSide
      ? "19.9rem"
      : "12.25rem"};
  height: 19.9rem;
  height: ${(props) =>
    props.isSide ? "12.25rem" : "19.9rem"};

  background-color: ${(props) =>
    props.variant ? "green" : "red"};
`;

const CardText = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    line-height: 110%;
    color: black;
    text-transform: uppercase;
    text-align: center;
`

export default FieldCard;
