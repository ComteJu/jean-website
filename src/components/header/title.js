import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { theme } from "config/theme";

const H1 = styled.h1`
  a {
    text-decoration: none;
    color: ${theme.primary_color};
  }
`;

const Title = ({ siteTitle }) => (
  <H1>
    <Link to="/">{siteTitle}</Link>
  </H1>
);

export default Title;
