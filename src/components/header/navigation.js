import React from "react";
import styled from "styled-components";
import { Link } from 'gatsby'
import { theme } from 'config/theme'

const Nav = styled.nav`
  opacity: ${theme.opacity};
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    li {
      margin: 0 0.1em;
      a {
        color: ${theme.primary_color};
      }
    }
  }
`;

const Navigation = () => (
  <Nav>
    <ul>
      <li><Link to='/Work'>works</Link></li>
      <li>|</li>
      <li><Link to='/Bio'>bio</Link></li>
    </ul>
  </Nav>
);

export default Navigation;
