import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import RecipesDisplay from './RecipesDisplay'

//https://nainacodes.com/blog/create-an-

export const Wrapper = styled.div`
  margin: 5vw;
  display: grid;
  background: white;
  align-content: space-between;
  justify-content: space-between;
  grid-template-rows: min-content min-content min-content;
  grid-template-columns: auto repeat(3, 1fr);
  grid-gap: 5px 0px;
  grid-template-areas:
    'search     search  search  button'
    'categories recipes recipes recipes';

  @media screen and (max-width: 800px) {
    grid-template-rows: repeat(3, min-content);
    grid-template-columns: 1fr 1fr;
    height: auto;
    overflow: auto;
    align-items: center;
    justify-content: space-between;
    grid-template-areas:
      'search      button'
      'categories  categories'
      'recipes     recipes';
  }
`
/**** BUTTON AREA ****/
const Button = styled.button`
  grid-area: button;
  color: #f2f2f2;
  background-color: #607878;
  height: 50px;
  width: 12vw;
  cursor: pointer;
  font-family: 'Source Sans Pro', sans-serif;
  outline: none;
`
const ButtonArea = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`

const SearchBar = styled.input`
  grid-area: search;
  width: 72vw;
  height: 100%;
  font-size: 17px;
  font-family: 'Source Sans Pro', sans-serif;
  border: 1px solid transparent;
  border-bottom: 1px solid #afc9be;

  &:focus {
    outline: none;
  }
`
/**** CATEGORIES ****/
const Categories = styled.div`
  grid-area: categories;
  padding-right: 2vw;
  text-decoration: none;
  font-family: 'Source Sans Pro', sans-serif;
  display: inline-block;
  vertical-align: middle;
`
const CheckBox = styled.input``

/**** RECIPES ****/
const Recipe = styled.div`
  grid-area: recipes;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Recipes: FunctionComponent = () => {
  //https://www.youtube.com/watch?v=TWODzlTeZUM
  return (
    <React.Fragment>
      <Wrapper>
        <SearchBar type="search" placeholder="Hva har du lyst på i dag?" />

        <ButtonArea>
          <Button type="submit">SØK</Button>
        </ButtonArea>

        <Categories>
          <h2>Kategorier</h2>

          <CheckBox type="checkbox"></CheckBox>
          <label> Frokost</label>
          <br></br>
          <CheckBox type="checkbox"></CheckBox>
          <label> Lunsj</label>
          <br></br>
          <CheckBox type="checkbox"></CheckBox>
          <label> Frokost</label>
          <br></br>
        </Categories>

        <Recipe>
          <RecipesDisplay />
        </Recipe>
      </Wrapper>
    </React.Fragment>
  )
}

export default Recipes
