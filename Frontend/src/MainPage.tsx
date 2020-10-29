import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import { ApolloProvider } from '@apollo/client'
//https://nainacodes.com/blog/create-an-accessible-and-reusable-react-modal

//Tag import

import NavBar from './components/NavBar'
import AboutUs from './components/pages/AboutUs'
import Recipes from './components/pages/Recipes'
import client from './initApollo'

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'PT Sans', sans-serif;
  display: grid;

  grid-template-areas:
    'navbar'
    'content';
`
interface FieldProps {
  area?: string
}

const Field = styled.div<FieldProps>`
  grid-area: ${props => props.area};
`

function MainPage() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Router>
          <Field area="navbar">
            <NavBar />
          </Field>
          <Field area="content">
            <Switch>
              <Route exact path="/" component={Recipes} />
              <Route exact path="/AboutUs" component={AboutUs}></Route>
            </Switch>
          </Field>
        </Router>
      </Wrapper>
    </ApolloProvider>
  )
}

export default MainPage
