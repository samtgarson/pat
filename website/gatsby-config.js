/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  siteMetadata: {
    title: `pat-cli`,
    description: `An interactive CLI to use your Postman collections anywhere`,
    author: `@samtgarson`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `pat-cli`,
        short_name: `pat`,
        start_url: `/`,
        background_color: `#white`,
        theme_color: `black`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-plugin-typescript'
  ]
}
