import React, { FunctionComponent } from 'react'
import {
  //ConfirmationButtons,
  Header,
  //Picture,
  //Time,
  Recipe,
  //Wrapper,
  Content,
} from './modal.style'

interface ConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void

  title: string
  time: string
  description: string
}

export const RecipeModal: FunctionComponent<ConfirmationModalProps> = props => {
  return (
    <React.Fragment>
      <Header>{props.title}</Header>

      <Content>{props.time}</Content>
      <Recipe>{props.description}</Recipe>

      {/*  <ConfirmationButtons></ConfirmationButtons> */}
    </React.Fragment>
  )
}
