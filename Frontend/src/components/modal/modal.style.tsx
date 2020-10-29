import styled from 'styled-components'

// ***** REUSEABLE MODAL *******
export const WrapperModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: 70vw;

  display: grid;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: min-content auto;
  grid-template-areas:
    'title  title'
    'img    cont'
    'recipe recipe';

  @media screen and (max-width: 800px) {
    width: auto;
    grid-template-columns: auto;
    grid-template-rows: min-content min-content auto auto;
    grid-template-areas:
      'title'
      'img'
      'cont'
      'recipe';
  }
`

export const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`

export const Header = styled.div`
  grid-area: title;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #afc9be;
  color: #607878;
  font-size: 18px;
`

export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`
export const Picture = styled.img`
  grid-area: img;
  width: 30vw;
  height: auto;
  padding: 5vw;
  background-color: white;
  @media screen and (max-width: 800px) {
    justify-self: center;
    width: 70vw;
  }
`

export const Content = styled.div`
  grid-area: cont;
  padding: 5vw;
  overflow: hidden;
  background-color: white;
  color: #607878;
`

export const Recipe = styled.div`
  grid-area: recipe;
  padding: 5vw;
  background-color: white;
  color: #607878;
`
