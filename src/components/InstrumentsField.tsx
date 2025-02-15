import styled from "styled-components";

function InstrumentsField() {
  return (
    <InstrumentsFieldWrapper>

    </InstrumentsFieldWrapper>
  );
}

const InstrumentsFieldWrapper = styled.div`
    width: calc(100vw - 30vw);
    height: auto;
    aspect-ratio: 1/1;
    background-color: #FFFFFF;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export default InstrumentsField;
