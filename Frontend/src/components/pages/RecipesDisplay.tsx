import styled from 'styled-components'

import React, { FunctionComponent, useEffect, useState } from 'react'

import { Modal } from '../modal/modal'
import { RecipeModal } from '../modal/recipe-modal'
import { useModal } from '../modal/useModal'
import { useQuery } from '@apollo/client'
import { GET_RECIPE_QUERY } from '../../queries'
import BottomScrollListener from 'react-bottom-scroll-listener'

export const Wrapper = styled.div`
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
  className?: string
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

const CardContent = styled.div<RecipeCardProps>`
  grid-area: description;
  padding: 5px;
  height: auto;
`

const RecipesDisplay: FunctionComponent = () => {
  const { isShown, openModal, closeModal } = useModal()
  const [activeRecipe, setActiveRecipe] = useState()

  useEffect(() => {
    if (activeRecipe !== undefined) openModal()
  }, [activeRecipe])

  const pageSize = 15
  const [pageOffset, setPageOffset] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  const { loading, error, data, fetchMore } = useQuery(GET_RECIPE_QUERY, {
    variables: {
      offset: pageOffset,
    },
  })

  if (loading) return <CardContent>Loading...</CardContent>
  if (error) return <CardContent>Error!</CardContent>

  const fetchMoreRecipes = () => {
    fetchMore({
      variables: {
        offset: pageSize * pageNumber,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        setPageOffset(pageOffset + pageSize)
        setPageNumber(pageNumber + 1)
        return Object.assign({}, prev, {
          recipes: [...prev.recipes, ...fetchMoreResult.recipes],
        })
      },
    })
  }

  return (
    <Wrapper>
      {data.recipes.map((recipe: any) => (
       <div data-cy="recipeCard">
          <RecipeCard 
          onClick={() => {
            setActiveRecipe(recipe)
          }} 
        >
          <CardImage src={recipe.Image} />
          <CardTitle className="cardTitle">{recipe.Name}</CardTitle>
        </RecipeCard> 
        </div>
      ))}
      <BottomScrollListener onBottom={fetchMoreRecipes} />
      {activeRecipe && (
        <Modal
          isShown={isShown}
          hide={closeModal}
          modalContent={
            <RecipeModal closeModal={closeModal} recipe={activeRecipe!} />
          }
        />
      )}
    </Wrapper>
  )
}

export default RecipesDisplay
