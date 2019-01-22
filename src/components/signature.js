import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";
import { graphql, StaticQuery } from "gatsby";

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

class Signature extends React.Component {
  render() {
    const { edges: elements } = this.props.data.allTrelloCard;
    return (
      <Footer>
        <Ul>
          {elements.map(({ node: e }) => (
            <Li key={e.id}>
              <p>{e.name}</p>
            </Li>
          ))}
        </Ul>
      </Footer>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allTrelloCard(
          filter: { list_name: { eq: "Pied de page" } }
          sort: { fields: [index], order: DESC }
        ) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => <Signature data={data} {...props} />}
  />
);
