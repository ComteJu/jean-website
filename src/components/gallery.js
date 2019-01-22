import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import posed from "react-pose";
import { theme } from "config/theme";


const Main = styled(posed.div({
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
}))`
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

class Gallery extends React.Component {
  render() {
    const { edges: toiles } = this.props.data.allTrelloCard;

    return (
        <Main>
          {toiles.map(({ node: toile }) => (
            <Toile key={toile.id}>
              {toile.image && (
                <Image
                  fluid={toile.image.childImageSharp.fluid}
                  alt={toile.name}
                />
              )}
              <figcaption
                dangerouslySetInnerHTML={{
                  __html: toile.childMarkdownRemark.html
                }}
              />
            </Toile>
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
          filter: { list_name: { eq: "Toiles" } }
          sort: { fields: [index], order: ASC }
        ) {
          edges {
            node {
              id
              name
              index
              childMarkdownRemark {
                html
              }
              image {
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
    render={data => <Gallery data={data} {...props} />}
  />
);
