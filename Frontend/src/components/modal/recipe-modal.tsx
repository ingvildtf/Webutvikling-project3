import React, { FunctionComponent } from 'react'
import { Header, Recipe, Content, CloseButton, Picture } from './modal.style'

interface ConfirmationModalProps {
  closeModal: () => void

  recipe: {
    Name: string
    Ingredients: string
    Instruction: string
    Image: string
  }
}

export const RecipeModal: FunctionComponent<ConfirmationModalProps> = ({
  recipe,
  closeModal,
}) => {
  const { Name, Ingredients, Instruction, Image } = recipe
  return (
    <React.Fragment>
      <Header>
        {Name}
        <CloseButton onClick={closeModal}>X</CloseButton>
      </Header>
      <Picture src={Image} />
      <Content>{Ingredients}</Content>
      <Recipe>{Instruction}</Recipe>

      {/*  <ConfirmationButtons></ConfirmationButtons> */}
    </React.Fragment>
  )
}
