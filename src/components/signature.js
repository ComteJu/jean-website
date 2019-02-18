import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";
import { graphql, StaticQuery } from "gatsby";

/**
 * STYLE
 */

const Footer = styled.footer`
  padding: ${theme.space};
  @media screen and (min-width: 60em) {
    position: fixed;
    left: 0;
    bottom: ${theme.space};
    width: calc(${theme.space} + 18em);
    padding: 0 0 0 ${theme.space};
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  @media screen and (min-width: 60em) {
    justify-content: flex-end;
  }
`;
const Li = styled.li`
  width: fit-content;
  margin: 0 0.1em;
  p {
    opacity: calc(${theme.opacity});
  }
`;

/**
 * COMPONENT
 */

const Signature = () => (
  <StaticQuery
    query={signQuery}
    render={data => {
      return (
        <Footer>
          <Ul>
            <Li>
              <p>{data.sign.data.signature.text}</p>
            </Li>
            <Li>
              <p>@2019</p>
            </Li>
          </Ul>
        </Footer>
      );
    }}
  />
);

/**
 * QUERY
 */

const signQuery = graphql`
  query {
    sign: prismicConfiguration {
      id
      data {
        signature {
          text
        }
      }
    }
  }
`;

export default Signature;
