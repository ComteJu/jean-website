require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: "Jean Marion",
    titleAlt: "JMarion",
    shortName: "JMarion",
    author: "ComteJu",
    siteLanguage: "fr",
    pathPrefix: "/",
    logo: "src/images/jm_icon.png",
    banner: "src/images/jm_icon.png",
    url: "https://jeanmarion.com",
    description:
      "Site officiel de Jean Marion, artiste peintre, Brest - Landerneau."
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Jean Marion",
        short_name: "JMarion",
        start_url: "/",
        background_color: "#FFF",
        theme_color: "#000",
        display: "minimal-ui",
        icon: "src/images/jm_icon.png",
        banner: "src/images/jm_icon.png"
      }
    }, 
    "gatsby-transformer-remark",
    "gatsby-plugin-offline",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-styled-components`
  ]
};
