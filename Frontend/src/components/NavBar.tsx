import React from 'react'
import { Link } from 'react-router-dom'
//import Button from './Button';
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #afc9be; /* #faf0e6 */
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
    color: black;
    padding: 10px 20px;

    text-decoration: none;
    font-size: 25px;
  }

  .link {
    color: black;
    text-decoration: none;
  }
`

function Navbar() {
  return (
    //lager navigasjonsbaren øverst på siden
    <Wrapper>
      <Container className="navbar-container container">
        <Link className="logo" to="/">
          OPPSKRIFTER
        </Link>

        {/**Setter navigasjonen til å være drop meny når siden blir under en størrelse */}

        <Link className="link" to="/AboutUs">
          Om oss
        </Link>
      </Container>
    </Wrapper>
  )
}

export default Navbar
