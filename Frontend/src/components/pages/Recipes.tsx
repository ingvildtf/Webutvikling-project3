import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import RecipesDisplay from './RecipesDisplay'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import {
  fetchAllRecipes,
  fetchDinnerRecipes,
  fetchBreakfastRecipes,
  fetchDessertRecipes,
  filterRecipes,
  sortDecending,
} from '../../actions/productActions'
import { resetPage } from '../../actions/pageActions'

//https://nainacodes.com/blog/create-an-

//CSS-styling
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
const Categories = styled.div`
  grid-area: categories;
  padding-right: 2vw;
  text-decoration: none;
  font-family: 'Source Sans Pro', sans-serif;
  display: inline-block;
  vertical-align: middle;
`
const CheckBox = styled.input``

const Recipe = styled.div`
  grid-area: recipes;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Recipes: FunctionComponent = () => {
  const [dinnerActiveRecipe, setActiveDinner] = useState(false)
  const [breafastActiveRecipe, setActiveBreakfast] = useState(false)
  const [dessertActiveRecipe, setActiveDessert] = useState(false)
  const dispatch = useDispatch()

  const decendingSort = useSelector(
    (state: RootStateOrAny) => state.recipesReducer.sortDecending
  )

  //https://www.youtube.com/watch?v=TWODzlTeZUM
  //const search = useSelector((state:RootStateOrAny) => state.recipeReducer.search)

  //Handling search-input
  let search = ''
  const filteredByInput = (e: React.KeyboardEvent) => {
    console.log(e.key)
    if (e.key.length < 2) {
      search += e.key
    }
    if (e.key === 'Backspace') {
      let word = search
      search = ''
      for (let i = 0; i < word.length - 1; i++) {
        search += word.charAt(i)
      }
    }
    console.log(search)
  }

  const searchHandler = () => {
    dispatch(resetPage())
    dispatch(filterRecipes(search))
    setActiveDinner(false)
    setActiveBreakfast(false)
    setActiveDessert(false)
  }

  //Handling checbox-input, displaying active categories
  const onClick = (action: any) => {
    switch (action) {
      case 'dinner':
        dispatch(resetPage())
        dispatch(fetchDinnerRecipes())
        setActiveDinner(true)
        setActiveBreakfast(false)
        setActiveDessert(false)
        return
      case 'breakfast':
        dispatch(resetPage())
        dispatch(fetchBreakfastRecipes())
        setActiveDinner(false)
        setActiveBreakfast(true)
        setActiveDessert(false)
        return
      case 'dessert':
        dispatch(resetPage())
        dispatch(fetchDessertRecipes())
        setActiveDinner(false)
        setActiveBreakfast(false)
        setActiveDessert(true)
        return
      case 'allRecipes':
        dispatch(resetPage())
        dispatch(fetchAllRecipes())
        setActiveDinner(false)
        setActiveBreakfast(false)
        setActiveDessert(false)
        return
      default:
        return
    }
  }

  return (
    <React.Fragment>
      <Wrapper>
        <SearchBar
          type="text"
          onKeyDown={e => {
            filteredByInput(e)
          }}
          placeholder="What would you like?"
          data-cy="searchBar"
        />

        <ButtonArea>
          <Button type="submit" onClick={() => searchHandler()}>
            SEARCH
          </Button>
        </ButtonArea>

        <Categories>
          <h2>Categories</h2>

          <CheckBox
            type="checkbox"
            checked={dinnerActiveRecipe}
            onClick={() => {
              dinnerActiveRecipe ? onClick('allRecipes') : onClick('dinner')
            }}
          ></CheckBox>
          <label> Dinner</label>
          <br></br>
          <CheckBox
            type="checkbox"
            checked={breafastActiveRecipe}
            onClick={() => {
              breafastActiveRecipe
                ? onClick('allRecipes')
                : onClick('breakfast')
            }}
          ></CheckBox>
          <label> Breakfast</label>
          <br></br>
          <CheckBox
            type="checkbox"
            checked={dessertActiveRecipe}
            onClick={() => {
              dessertActiveRecipe ? onClick('allRecipes') : onClick('dessert')
            }}
          ></CheckBox>
          <label> Dessert </label>
          <br></br>

          <h2>Sort By</h2>
          <CheckBox
            type="checkbox"
            checked={!decendingSort}
            onClick={() => {
              dispatch(sortDecending(!decendingSort))
            }}
          ></CheckBox>
          <label> Name - A-Z</label>
          <br></br>
          <CheckBox
            type="checkbox"
            checked={decendingSort}
            onClick={() => {
              dispatch(sortDecending(!decendingSort))
            }}
          ></CheckBox>
          <label> Name - Z-A</label>
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
