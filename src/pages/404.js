import React from 'react'
import styled from "styled-components";
import Layout from '../components/layout'


const Zone = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`


class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Zone>
        <h1>Oups</h1>
        <p>Cette page n'existe pas...</p>
        </Zone>
      </Layout>
    )
  }
}

export default NotFoundPage