import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Header from "../components/header/header";
import Contact from "../components/contact";
import Social from "./social";
import Signature from "./signature";
import SEO from "./SEO";
import { createGlobalStyle } from "styled-components";
import "typeface-playfair-display";

/**
 * STYLE
 */

const GlobalStyle = createGlobalStyle`

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
  font-family: 'Playfair Display', serif;
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

/**
 * COMPONENT
 */

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={layoutQuery}
      render={data => {
        return (
          <>
            <GlobalStyle />
            <SEO />
            <Header siteTitle={data.site.siteMetadata.title} />
            <Contact />
            <Social />
            {children}
            <Signature />
          </>
        );
      }}
    />
  );
};

/**
 * QUERY
 */

const layoutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Layout;
