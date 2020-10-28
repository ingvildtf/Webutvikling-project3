import React, { Component, FunctionComponent, useState } from 'react'
import { render } from 'react-dom'
import { Modal } from '../modal'
import { RecipeModal } from '../recipe-modal'
import { useModal } from '../useModal'
import styled from 'styled-components'
import RecipesDisplay from './RecipesDisplay'

//https://nainacodes.com/blog/create-an-
import Form from '../form'
import Filter from '../Filter'

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
interface RecipeCardProps {
  title?: string
  content?: string
  image?: string
}

const RecipeCard = styled.div<RecipeCardProps>`
  width: 25vw;
  margin: 10px 10px 0 0;
  border-radius: 4px;
  background-color: #f2f2f2;
  font-size: 14px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'img'
    'title';
  @media screen and (max-width: 800px) {
    width: 42vw;
    margin: 10px 0 0 0;
    align-content: center;
    justify-content: space-between;
  }
  @media screen and (max-width: 500px) {
    width: 100vw;
    margin: 10px 0 0 0;
    align-content: center;
    justify-content: space-between;
  }
`
const CardImage = styled.img`
  grid-area: img;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  border-radius: 4px 4px 0px 0px;
`

const CardTitle = styled.div<RecipeCardProps>`
  grid-area: title;
  font-size: 18px;
  padding-top: 20px;
  height: auto;
`
const recipes = [
  {
    name: 'Pizzabolle',
    content: [
      {
        imageUrl:
          'https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg',
        time: '1 hour',
        description: 'Not healthy, but good as hell.',
      },
    ],
  },
  {
    name: 'Tomatsuppe',
    content: [
      {
        imageUrl:
          'https://idagranjansen.com/wp-content/uploads/tomatsuppe__p2b6663.jpg',
        time: '2 hours',
        description: 'This is the perfect dish.',
      },
    ],
  },
]

const Recipes: FunctionComponent = () => {
  /** MODAL **/
  const { isShown, toggle } = useModal()
  const onConfirm = () => toggle()
  const onCancel = () => toggle()

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
          <RecipeCard onClick={toggle}>
            <CardImage src={recipes[0].content[0].imageUrl} />
            <CardTitle>{recipes[0].name} </CardTitle>
            {/*         <CardContent> {recipes[0].content[0].description}</CardContent>
             */}{' '}
          </RecipeCard>
          <RecipeCard onClick={toggle}>
            <CardImage src={recipes[0].content[0].imageUrl} />
            <CardTitle>{recipes[0].name} </CardTitle>
            {/*         <CardContent> {recipes[0].content[0].description}</CardContent>
             */}{' '}
          </RecipeCard>
          <RecipeCard onClick={toggle}>
            <CardImage src={recipes[0].content[0].imageUrl} />
            <CardTitle>{recipes[0].name} </CardTitle>
            {/*         <CardContent> {recipes[0].content[0].description}</CardContent>
             */}{' '}
          </RecipeCard>{' '}
          <RecipeCard onClick={toggle}>
            <CardImage src={recipes[0].content[0].imageUrl} />
            <CardTitle>{recipes[0].name} </CardTitle>
            {/*         <CardContent> {recipes[0].content[0].description}</CardContent>
             */}{' '}
          </RecipeCard>{' '}
          <RecipeCard onClick={toggle}>
            <CardImage src={recipes[0].content[0].imageUrl} />
            <CardTitle>{recipes[0].name} </CardTitle>
            {/*         <CardContent> {recipes[0].content[0].description}</CardContent>
             */}{' '}
          </RecipeCard>{' '}
          <Modal isShown={isShown} hide={toggle} headerText="Pasta BoloNICE" />
        </Recipe>
      </Wrapper>
    </React.Fragment>
  )
}

export default Recipes
