import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";

const Main = styled(
  posed.div({
    enter: {
      x: 0,
      opacity: 1,
      transition: { ease: "easeOut", delay: 100 }
    },
    exit: {
      x: "-5%",
      opacity: 0,
      transition: { ease: "easeOut", delay: 0 }
    }
  })
)`

  padding: ${theme.space};
  @media screen and (min-width: 60em) {
    padding-top: calc(${theme.space} + 9em);
    padding-left: calc(${theme.space} + 18em);
  }
`;

const Section = styled.section`
  max-width: ${theme.max_width};
  margin: auto;
  line-height: 1.3;
  p {
    padding: 1em 0;
    text-indent: 1em;
    letter-spacing: 0.015em;
  }
  h3 {
    padding-top: 1em;
  }
  ul {
    padding-left: 0.4em;
    opacity: ${theme.opacity};
  }
`;

class About extends React.Component {
  render() {
    const { edges: sections } = this.props.data.allTrelloCard;
    return (
      <Main>
        {sections.map(({ node: section }) => (
          <Section
            key={section.id}
            dangerouslySetInnerHTML={{
              __html: section.childMarkdownRemark.html
            }}
          />
        ))}
      </Main>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allTrelloCard(
          filter: { list_name: { eq: "Infos" } }
          sort: { fields: [index], order: ASC }
        ) {
          edges {
            node {
              id
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    `}
    render={data => <About data={data} {...props} />}
  />
);
