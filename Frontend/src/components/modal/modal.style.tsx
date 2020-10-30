import styled from 'styled-components'

// ***** REUSEABLE MODAL *******
export const WrapperModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: 80vw;
  // height: 60vh;
  background-color: #f2f2f2;
  border: 1px solid #607878;

  display: grid;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: min-content auto;
  grid-template-areas:
    'title  title'
    'img    cont'
    'recipe recipe';

  @media screen and (max-width: 800px) {
    width: auto;
    top: 50%;
    height: 85vh;
    grid-template-columns: auto;
    grid-template-rows: min-content min-content min-content 1fr;
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
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
`

export const Header = styled.div`
  grid-area: title;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #afc9be;
  color: white;
  font-size: 18px;
  border-bottom: 2px dotted #607878;
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
  width: 20vw;
  height: auto;
  padding: 2vw;
  background-color: #f2f2f2;
  @media screen and (max-width: 800px) {
    justify-self: center;
    width: 70vw;
  }
`

export const Content = styled.div`
  grid-area: cont;
  padding: 2vw;
  overflow: hidden;
  background-color: #f2f2f2;
  color: black;
  display: flex;
  align-items: center;
`

export const Recipe = styled.div`
  grid-area: recipe;
  padding: 2vw;
  border-top: 2px dotted #607878;
  max-height: 100%;
  background-color: #f2f2f2;
  color: black;
  overflow: auto;
`
