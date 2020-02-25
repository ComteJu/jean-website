import React from "react";
import styled from "styled-components";

const Zone = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default () => {
  return (
    <Zone>
      <h1>Oups</h1>
      <p>Cette page n'existe pas...</p>
    </Zone>
  );
};
