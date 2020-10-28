import styled from 'styled-components'

import React, { Component, FunctionComponent, useState } from 'react'

import { Modal } from '../modal'
import { RecipeModal } from '../recipe-modal'
import { useModal } from '../useModal'
import { isTemplateElement } from '@babel/types'

export const Wrapper = styled.div`
  margin-top: 10px;
  display: grid;
  align-items: stretch;
  justify-items: end;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 50vh;
  grid-gap: 10px;
  grid-template-areas: 'recipe recipe recipe recipe';

  @media screen and (max-width: 1050px) {
    grid-template-rows: repeat(5, min-content);
    grid-template-columns: 1fr;
    height: auto;
    overflow: auto;
    grid-template-areas:
      'recipe'
      'recipe';
  }
`
const Button = styled.button`
  padding: 2px 5px;
  color: black;
  height: 50px;
  width: 60%;
  cursor: pointer;
  font-family: 'Source Sans Pro', sans-serif;
`
interface RecipeCardProps {
  title?: string
  content?: string
  image?: string
}

const RecipeCard = styled.div<RecipeCardProps>`
  width: 250px;
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
/* 
const CardContent = styled.div<RecipeCardProps>`
  grid-area: description;
  padding: 5px;
  height: auto;
`
 */
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

const RecipesDisplay: FunctionComponent = () => {
  const { isShown, toggle } = useModal()
  const onConfirm = () => toggle()
  const onCancel = () => toggle()

  return (
    <Wrapper>
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
        <CardImage src={recipes[1].content[1].imageUrl} />
        <CardTitle>{recipes[1].name} </CardTitle>
        {/*         <CardContent> {recipes[1].content[1].description}</CardContent>
         */}{' '}
      </RecipeCard>{' '}
      <RecipeCard onClick={toggle}>
        <CardImage src={recipes[0].content[0].imageUrl} />
        <CardTitle>{recipes[0].name} </CardTitle>
        {/*         <CardContent> {recipes[0].content[0].description}</CardContent>
         */}{' '}
      </RecipeCard>{' '}
      <Button onClick={toggle}>Open this recipe (picture here)</Button>
      <Modal isShown={isShown} hide={toggle} headerText="Pasta BoloNICE" />
    </Wrapper>
  )
}

export default RecipesDisplay
