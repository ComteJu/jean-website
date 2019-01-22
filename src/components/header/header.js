import React from "react";
import styled from "styled-components";
import Title from "../header/title";
import Navigation from "../header/navigation";
import { theme } from "config/theme";

const StyledHeader = styled.header`
  padding: ${theme.space} 0 0 ${theme.space};
  @media screen and (min-width: 60em) {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(${theme.space} + 18em);
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = ({ siteTitle, position }) => (
  <StyledHeader position={position}>
    <Title siteTitle={siteTitle} />
    <Navigation />
  </StyledHeader>
);

export default Header;
