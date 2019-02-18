import React from "react";
import styled from "styled-components";
import { theme } from "config/theme";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

/**
 * STYLE
 */

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

/**
 * COMPONENT
 */

const Social = () => (
  <StaticQuery
    query={socialQuery}
    render={data => {
      return (
        <Article>
          <Ul>
            {data.socials.edges.map(({ node: social }) => (
              <Li key={social.id}>
                <a
                  href={social.primary.lien.text}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    style={{ width: "1.2em" }}
                    fluid={social.primary.image.localFile.childImageSharp.fluid}
                  />
                </a>
              </Li>
            ))}
          </Ul>
        </Article>
      );
    }}
  />
);

/**
 * QUERY
 */

const socialQuery = graphql`
  query {
    socials: allPrismicSociaBodyLienSocial {
      edges {
        node {
          id
          primary {
            lien {
              text
            }
            image: icon {
              localFile {
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
    }
  }
`;

export default Social;
