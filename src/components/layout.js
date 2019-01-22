import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "../components/header/header";
import Contact from "../components/contact";
import Social from "./social";
import Signature from "./signature"
import SEO from "./SEO";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url(${props => props.importFont});

html {
  box-sizing: border-box;
  text-size-adjust: 100%;
  
}

*, *:before, *:after {
  box-sizing: inherit;
  font-size: 15px;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul, li {
  margin: 0;
  padding: 0;
  font-weight: normal;
}


h1 {
  font-family: ${props => props.font}, serif;
}

p {
  hyphens: auto;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
`;
class Layout extends React.Component {
  render() {
    const { children, data } = this.props;

    const fontOne =
      data.trelloCard.childMarkdownRemark.frontmatter.typo;
    const importFont =
      "https://fonts.googleapis.com/css?family=" + fontOne.replace(/ /g, "+");

    return (
      <>
        <GlobalStyle font={fontOne} importFont={importFont} />
        <SEO />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Contact />
        <Social />
        {children}
        <Signature />
      </>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        trelloCard(name: { eq: "Styles" }) {
          id
          childMarkdownRemark {
            frontmatter {
              typo
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
);