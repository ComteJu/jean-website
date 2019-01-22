import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";

const Article = styled(
  posed.article({
    enter: {
      x: 0,
      opacity: 1,
      transition: {
        ease: "easeInOut"
      }
    },
    exit: {
      x: 0,
      opacity: 0,
      transition: {
        ease: "easeInOut"
      }
    }
  })
)`
  text-align: left;
  padding: ${theme.space} 0 0 ${theme.space};
  @media screen and (max-width: 420px) {
    opacity: 1;
  }
  @media screen and (min-width: 60em) {
    position: fixed;
    left: 0;
    top: calc(${theme.space} + 2.2em);
    width: calc(${theme.space} + 18em);
  }
  h3 {
    opacity: ${theme.opacity};
  }
`;

class Contact extends React.Component {
  render() {
    const { edges: contacts } = this.props.data.allTrelloCard;
    return (
      <Article>
        {contacts.map(({ node: contact }) => (
          <h3 key={contact.id}>{contact.name}</h3>
        ))}
      </Article>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allTrelloCard(filter: { list_name: { eq: "Contact" } }) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => <Contact data={data} {...props} />}
  />
);
