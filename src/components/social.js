import React from "react";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

const Article = styled.article`
  padding: ${theme.space} ${theme.space} 0 ${theme.space};
  @media screen and (max-width: 420px) {
    opacity: 1;
  }
  @media screen and (min-width: 60em) {
    position: fixed;
    left: 0;
    bottom: calc(${theme.space} * 2);
    width: calc(${theme.space} + 18em);
    padding: ${theme.space} 0 0 ${theme.space};
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;
const Li = styled.li`
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  width: fit-content;
`;

const Footer = styled.footer`
  padding: 0.5em 0 0 0;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

class Social extends React.Component {
  render() {
    const { edges: icons } = this.props.data.allTrelloCard;
    return (
      <Article>
        <Ul>
          {icons.map(({ node: icon }) => (
            <Li key={icon.id}>
              <a
                href={icon.childMarkdownRemark.frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon.image && (
                  <Img
                    style={{ width: "1.2em" }}
                    fluid={icon.image.childImageSharp.fluid}
                  />
                )}
              </a>
            </Li>
          ))}
        </Ul>
      </Article>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allTrelloCard(
          filter: { list_name: { eq: "Liens" } }
          sort: { fields: [index], order: ASC }
        ) {
          edges {
            node {
              id
              name
              childMarkdownRemark {
                frontmatter {
                  url
                }
              }
              image {
                id
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Social data={data} {...props} />}
  />
);
