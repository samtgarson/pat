import React, { FunctionComponent } from "react"

const Layout: FunctionComponent = ({ children }) => (
  <div style={{
    padding: `10vh 30px 30px`
  }}>
    <main
      style={{
        margin: `0 auto`,
        maxWidth: 500
      }}
    >
      {children}
    </main>
    <footer style={{
      textAlign: 'center',
      padding: 10
    }}>
      An experiment by <a href="https://samgarson.com">Sam Garson</a>. Thanks for reading.
    </footer>
  </div>
)

export default Layout
