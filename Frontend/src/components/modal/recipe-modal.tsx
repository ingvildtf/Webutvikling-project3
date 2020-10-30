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
  const { Name, Ingredients, Instruction, Image, Review } = recipe
  const [stars, setStars] = useState(0) //Tester
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
          onChange={value => setStars(value)}
        />
      </Rating>
      <Content>{Ingredients}</Content>
      <Recipe>{Instruction}</Recipe>

      {/*  <ConfirmationButtons></ConfirmationButtons> */}
    </React.Fragment>
  )
}
