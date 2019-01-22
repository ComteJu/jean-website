import React from "react";
import Layout from "../components/layout";
import About from "../components/about";

class Bio extends React.Component {
  render() {
    return (
      <Layout>
        <About />
      </Layout>
    );
  }
}

export default Bio;
