import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";

/**
 * STYLE
 */

const Main = styled(
  posed.div({
    enter: {
      y: 0,
      opacity: 1,
      transition: { ease: "easeOut" }
    },
    exit: {
      y: "2%",
      opacity: 0,
      transition: { ease: "easeOut" }
    }
  })
)`
  padding-top: calc(${theme.space} * 2);
  margin: auto;
  @media screen and (min-width: 60em) {
    padding-left: calc(${theme.space} + 18em);
  }
`;

const Toile = styled.figure`
  margin: 0 ${theme.space} 5vmax ${theme.space};
  figcaption {
    padding: ${theme.space};
    text-align: center;
    opacity: 0.7;
  }
`;

const Image = styled(Img)`

  max-height: 70vh;
  img {
    object-fit: contain !important;
  }
  width: auto;
}
`;

/**
 * COMPONENT
 */

const Gallery = () => (
  <StaticQuery
    query={galleryQuery}
    render={data => {
      return (
        <Main>
          {data.toiles.edges.map(({ node: toile }) => (
            <Toile key={toile.id}>
              <Image
                fluid={
                  toile.primary.toile_image.localFile.childImageSharp.fluid
                }
                alt={toile.primary.desc.text}
              />
              <figcaption
                dangerouslySetInnerHTML={{
                  __html: toile.primary.desc.html
                }}
              />
            </Toile>
          ))}
        </Main>
      );
    }}
  />
);

/**
 * QUERY
 */

const galleryQuery = graphql`
  query {
    toiles: allPrismicGallerieBodyToile {
      edges {
        node {
          id
          primary {
            toile_image {
              localFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
            desc: toile_description {
              html
              text
            }
          }
        }
      }
    }
  }
`;

export default Gallery;
