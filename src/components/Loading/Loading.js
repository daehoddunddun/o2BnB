import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";

function Loading() {
  return (
    <ContentBack>
      <ContentWrap>
        <ScaleLoader
          color="#f90939"
          height={30}
          width={10}
          radius={2}
          margin={2}
        />
      </ContentWrap>
    </ContentBack>
  );
}

const ContentBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
`;
const ContentWrap = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;

  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  border-radius: 2px;
`;
export default Loading;
