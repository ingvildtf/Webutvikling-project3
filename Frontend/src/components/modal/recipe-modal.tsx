import React, { FunctionComponent, useState } from 'react'
import {
  Header,
  Recipe,
  Content,
  CloseButton,
  Picture,
  Rating,
} from './modal.style'
import BeautyStars from 'beauty-stars'
import { ADD_REVIEW, GET_REVIEWS } from '../../queries'
import { useMutation } from '@apollo/client'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

interface ConfirmationModalProps {
  closeModal: () => void

  recipe: {
    Name: string
    Ingredients: string
    Instruction: string
    Image: string
    Review: string
  }
}

export const RecipeModal: FunctionComponent<ConfirmationModalProps> = ({
  recipe,
  closeModal,
}) => {
  const { Name, Ingredients, Instruction, Image } = recipe
  const [stars, setStars] = useState(0) //Tester
  let recipeId: String = useSelector( (state: RootStateOrAny) => state.reviewReducer.recipeID)
  const dispatch = useDispatch()

  /*   const handleSubmit = () => {
    dispatch(
      addReview({
        variables: {
          matchedString: activeRecipe,
          addReview: stars,
        },
      })
    )
    setStars(0)
  } */
  /*   const [addReview] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      //this updates the review chahe with the new review from ADD_REVIEW
      const { review } = cache.readQuery({
        query: GET_REVIEWS,
        variables: { id: activeRecipe },
      })
      cache.writeQuery({
        query: GET_REVIEWS,
        variables: { id: activeRecipe, star: stars },
        data: { review: [...[addReview], ...review] },
      })
    },
  }) */

  console.log(recipeId)

  const [addReview] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      const { reviews } = cache.readQuery<any>({
        query: GET_REVIEWS,
        variables: {
          id: recipeId,
        },
      })
      cache.writeQuery({
        query: GET_REVIEWS,
        variables: { id: recipeId },
        data: { reviews: [...[addReview], ...reviews] },
      })
    },
  })

  const updateReview = (value: number) => {
    setStars(value)
    addReview({
      variables: {
        matchedString: recipeId,
        addReview: value,
      },
    })
    console.log(value)
  }

  return (
    <React.Fragment>
      <Header>
        {Name}
        <CloseButton onClick={closeModal}>X</CloseButton>
      </Header>
      <Picture src={Image} />
      <Rating>
        <BeautyStars
          inactiveColor={'#DDE2DC'}
          activeColor={'#607878'}
          value={stars}
          onChange={value => updateReview(value)}
        />
      </Rating>
      <Content>{Ingredients}</Content>
      <Recipe>{Instruction}</Recipe>

      {/*  <ConfirmationButtons></ConfirmationButtons> */}
    </React.Fragment>
  )
}
