import styled from 'styled-components'
import BeautyStars from 'beauty-stars'

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
  width: 23vw;
  margin: 2vw 0.5vw 0 0;
  border-radius: 4px;
  background-color: #eff1ee;
  font-size: 14px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content min-content;
  grid-template-areas:
    'img'
    'title'
    'rating';
  @media screen and (max-width: 800px) {
    width: 42vw;
    margin-top: 4vw;
    align-content: center;
    justify-content: space-between;
  }
  @media screen and (max-width: 500px) {
    width: 90vw;
    margin-top: 4vw;
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
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1vw 0 1vw;
`

const CardRatingWrapper = styled.div<RecipeCardProps>`
  grid-area: rating;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1vw 1vw 1vw;
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

  if (loading) return <CardRatingWrapper>Loading...</CardRatingWrapper>
  if (error) return <CardRatingWrapper>Error!</CardRatingWrapper>

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
        <RecipeCard
          onClick={() => {
            setActiveRecipe(recipe)
          }}
          data-cy="recipeCard"
        >
          <CardImage src={recipe.Image} />
          <CardTitle className="cardTitle">{recipe.Name}</CardTitle>
          <CardRatingWrapper>
            <BeautyStars inactiveColor={'#DDE2DC'} activeColor={'#607878'} />
          </CardRatingWrapper>
        </RecipeCard>
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
