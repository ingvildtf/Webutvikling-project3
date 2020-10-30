import React from 'react'
import { Link } from 'react-router-dom'
//import Button from './Button';
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #607878; /* #faf0e6 */
  height: 10vh;
  align-items: center;
  font-size: 1.2rem;
  font-family: 'Source Sans Pro', sans-serif;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  width: 90vw;
  padding-left: 20px;
  font-family: 'Source Sans Pro', sans-serif;
  .logo {
    color: white;
    padding: 10px 20px;

    text-decoration: none;
    font-size: 25px;
  }

  .link {
    color: white;
    text-decoration: none;
  }
`

function Navbar() {
  return (
    //lager navigasjonsbaren øverst på siden
    <Wrapper>
      <Container className="navbar-container container">
        <Link className="logo" to="/">
          A RECIPE FOR SUCCESS
        </Link>
      </Container>
    </Wrapper>
  )
}

export default Navbar
