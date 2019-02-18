import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";

/**
 * STYLE
 */

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

/**
 * COMPONENT
 */

const Contact = () => (
  <StaticQuery
    query={contactQuery}
    render={data => {
      return (
        <Article>
          {data.contacts.edges.map(({ node: contact }) => (
            <h3 key={contact.id}>{contact.primary.adresse.text}</h3>
          ))}
        </Article>
      );
    }}
  />
);

/**
 * QUERY
 */
const contactQuery = graphql`
  query {
    contacts: allPrismicContactBodyContact {
      edges {
        node {
          id
          primary {
            adresse {
              text
            }
          }
        }
      }
    }
  }
`;

export default Contact;
