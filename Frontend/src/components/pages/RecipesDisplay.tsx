import styled from 'styled-components'
import BeautyStars from 'beauty-stars'

import React, { FunctionComponent, useEffect, useState } from 'react'

import { Modal } from '../modal/modal'
import { RecipeModal } from '../modal/recipe-modal'
import { useModal } from '../modal/useModal'
import { useQuery } from '@apollo/client'
import {
  GET_RECIPE_QUERY,
  GET_DINNER_RECIPES,
  GET_BREAKFAST_RECIPES,
  GET_DESSERT_RECIPES,
  GET_REVIEWS,
  SEARCH_RECIPES ,
} from '../../queries'
import BottomScrollListener from 'react-bottom-scroll-listener'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import {addRating} from '../../actions/reviewAction'
import { incrementPage } from '../../actions/pageActions'
import { FETCH_ALL_RECIPES, FETCH_DINNER_RECIPES } from '../../actions/types'
import pageReducer from '../../reducers/pageReducer'

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

  :hover {
    cursor: pointer;
  }
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

  const query = useSelector(
    (state: RootStateOrAny) => state.recipesReducer.query
  )
  const sortDecending: Boolean = useSelector((state: RootStateOrAny) => state.recipesReducer.sortDecending)
  const searchField: String = useSelector((state: RootStateOrAny) => state.recipesReducer.search)
  const pageOffset = useSelector(
    (state: RootStateOrAny) => state.pageReducer.pageOffset
  )
  const pageSize = useSelector(
    (state: RootStateOrAny) => state.pageReducer.pageSize
  )
  const pageNumber = useSelector(
    (state: RootStateOrAny) => state.pageReducer.pageNumber
  )
  const dispatch = useDispatch()
  /* const pageSize = 15
  const [pageOffset, setPageOffset] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)*/
console.log(searchField)

  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: {
      matchedString: searchField,
      offset: pageOffset,
      sortDecending: sortDecending ? -1 : 1
    },
  })
  

  const queryName = (query: any) => {
    switch (query) {
      case GET_RECIPE_QUERY:
        return Object(data.recipes)
      case GET_DINNER_RECIPES:
        return Object(data.dinner)
      case GET_BREAKFAST_RECIPES:
        return Object(data.breakfast)
      case GET_DESSERT_RECIPES:
        return Object(data.dessert)
      case SEARCH_RECIPES:
        return Object(data.searchRecipes)
      default:
        return Object(data.recipes)
    }
  }

  if (loading) return <CardRatingWrapper>Loading...</CardRatingWrapper>
  if (error) return <CardRatingWrapper>Error!</CardRatingWrapper>

  const fetchMoreRecipes = () => {
    fetchMore({
      variables: { 
        matchedString: searchField,     
        offset: pageSize * pageNumber,
        sortDecending: sortDecending ? -1 : 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        switch (query) {
          case !fetchMoreResult:
            dispatch(incrementPage())
            return prev
          case GET_RECIPE_QUERY:
            dispatch(incrementPage())
            return Object.assign({}, prev, {
              recipes: [...prev.recipes, ...fetchMoreResult.recipes],
            })
          case GET_DINNER_RECIPES:
            dispatch(incrementPage())
            /* setPageOffset(pageOffset + pageSize)
            setPageNumber(pageNumber + 1)*/
            return Object.assign({}, prev, {
              dinner: [...prev.dinner, ...fetchMoreResult.dinner],
            })
          case GET_DESSERT_RECIPES:
            dispatch(incrementPage())
            return Object.assign({}, prev, {
              dessert: [...prev.dessert, ...fetchMoreResult.dessert],
            })
          case GET_BREAKFAST_RECIPES:
            dispatch(incrementPage())
            return Object.assign({}, prev, {
              breakfast: [...prev.breakfast, ...fetchMoreResult.breakfast],
            })
          case SEARCH_RECIPES:
            dispatch(incrementPage());
            return Object.assign({}, prev, {
              searchRecipes: [...prev.searchRecipes, ...fetchMoreResult.searchRecipes],
            })
          default:
            dispatch(incrementPage())
            /* setPageOffset(pageOffset + pageSize)
            setPageNumber(pageNumber + 1)*/
            return Object.assign({}, prev, {
              recipes: [...prev.recipes, ...fetchMoreResult.recipes],
            })
        }

        /*if (!fetchMoreResult) return prev
        setPageOffset(pageOffset + pageSize)
        setPageNumber(pageNumber + 1)
        
        return Object.assign({}, prev, {
          dinner: [...prev.dinner, ...fetchMoreResult.dinner],
        })*/
      },
    })
  }

  const activateRecipe = (recipe:any) => {
    setActiveRecipe(recipe)
    dispatch(addRating(recipe.ID))
    console.log(typeof(recipe.ID))
  }

  return (
    <Wrapper>
      {queryName(query).map((recipe: any) => (
        <RecipeCard
          onClick={() => {
            activateRecipe(recipe)
          }}
          data-cy="recipeCard"
        >
          <CardImage src={recipe.Image} />
          <CardTitle className="cardTitle">{recipe.Name}</CardTitle>
          <CardRatingWrapper>
            <BeautyStars
              size={26}
              value={
                recipe.Review.reduce(
                  (previousValue: number, currentValue: number) =>
                    previousValue + currentValue,
                  0
                ) / recipe.Review.length
              }
              inactiveColor={'#DDE2DC'}
              activeColor={'#607878'}
            />
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
