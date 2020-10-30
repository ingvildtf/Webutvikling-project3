import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import RecipesDisplay from './RecipesDisplay'
import {useSelector, useDispatch, AnyIfEmpty, RootStateOrAny} from 'react-redux'
import {fetchAllRecipes, fetchDinnerRecipes, fetchBreakfastRecipes, fetchDessertRecipes} from '../../actions/productActions'
import {resetPage} from '../../actions/pageActions'

//https://nainacodes.com/blog/create-an-

export const Wrapper = styled.div`
  margin: 5vw;
  display: grid;
  background: white;
  align-content: space-between;
  justify-content: space-between;
  grid-template-rows: min-content min-content;
  grid-template-columns: auto repeat(4, auto);
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
  color: white;
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
  color: #afc9be;
  border-bottom: 1px solid #607878;

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
  //const search = useSelector((state:RootStateOrAny) => state.recipeReducer.search)
  let search = ""; 
  const dispatch = useDispatch(); 

  const filteredByInput = (e: React.KeyboardEvent) => {
    if(e.key.length < 2){
      search += e.key;
    }
    if(e.key == "Backspace"){
      let word = search
      search = ""
      for(let i = 0; i < word.length-1; i ++){
        search += word.charAt(i)
      }
    }
  }

  const onClick = (action:any) => {
    switch (action) {
      case 'dinner':
        dispatch(resetPage());
        dispatch(fetchDinnerRecipes());
        return 
      case 'breakfast':
        dispatch(resetPage());
        dispatch(fetchBreakfastRecipes());
        return 
      case 'dessert':
        dispatch(resetPage());
        dispatch(fetchDessertRecipes());
        return 
      case 'allRecipes':
        dispatch(resetPage());
        dispatch(fetchAllRecipes());
        return 
      default:
        return 
    }
  }

  return (
    <React.Fragment>
      <Wrapper>
        <SearchBar type='text' onKeyDown={(e)=> {filteredByInput(e)}} placeholder="Hva har du lyst på i dag?"  data-cy="searchBar"/>

        <ButtonArea>
          <Button type="submit">SØK</Button>
        </ButtonArea>

        <Categories>
          <h2>Kategorier</h2>

          <CheckBox type="checkbox" onClick={ ()=> onClick('dinner')}></CheckBox>
          <label> Dinner</label>
          <br></br>
          <CheckBox type="checkbox" onClick={() => onClick('breakfast')}></CheckBox>
          <label> Breakfast</label>
          <br></br>
          <CheckBox type="checkbox" onClick={() => onClick('dessert')}></CheckBox>
          <label> Dessert </label>
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
