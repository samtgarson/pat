import React, { FunctionComponent } from 'react'
import { GitHub, DownloadCloud, Twitter, Heart } from 'react-feather'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Section } from '../components/section'
import RequestDemo from '../images/request-demo.svg'

const IconLink: FunctionComponent<{ href: string }> = ({ href, children }) => (
  <a style={{ margin: `0 10px` }} href={href}>{ children }</a>
)

const IndexPage: FunctionComponent = () => (
  <Layout>
    <SEO title='pat-cli' />
    <div style={{ textAlign: 'center' }}>
      <p><span role='img' aria-label='postbox'>📮</span></p>
      <h1><strong>pat</strong><em>—postman on the command line.</em></h1>
      <p>An interactive CLI to use your Postman collections anywhere</p>
    </div>
    <Section centered={true}>
      <IconLink href="https://npmjs.com/package/pat-cli"><DownloadCloud /></IconLink>
      <IconLink href="https://github.com/samtgarson/pat"><GitHub /></IconLink>
      <IconLink href="https://twitter.com/samtgarson"><Twitter /></IconLink>
      <IconLink href="https://samgarson.com"><Heart /></IconLink>
    </Section>
    <Section>
      <img src={RequestDemo} alt="A demo of making a request with Pat" />
    </Section>
    <Section>
      <p>Pat allows you to:</p>
      <ul>
        <li>Access your Postman collections from your command line</li>
        <li>Edit your environment and make requests</li>
        <li>Use OAuth2 authentication <em>(more types coming soon)</em></li>
      </ul>
    </Section>
    <Section>
      <p>You&apos;ll need:</p>
      <ul>
        <li>Your existing Postman collection</li>
        <li>A Postman account (they&apos;re free)</li>
        <li>A Postman API Key (create one <a href="https://web.postman.co/settings/me/api-keys">here</a>)</li>
      </ul>
    </Section>
    <Section>
      <p>Install:</p>
      <code>
        npm install -g pat-cli
      </code>
      <p>Use:</p>
      <code>
        pat
      </code>
    </Section>
  </Layout>
)

export default IndexPage
