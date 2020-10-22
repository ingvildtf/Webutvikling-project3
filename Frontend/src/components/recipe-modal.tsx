import React, { FunctionComponent } from 'react';
import {
	ConfirmationButtons,
	Message,
	Picture,
	Time,
	Description,
	Wrapper,
} from './modal.style';

interface ConfirmationModalProps {
	onConfirm: () => void;
	onCancel: () => void;
  
  title: string;
  time: string;
  description: string;
  
}

export const RecipeModal: FunctionComponent<ConfirmationModalProps> = props => {
	return (
		<React.Fragment>
      <Message>{props.title}</Message>
	  
	  <Time>{props.time}</Time>
	  <Description>{props.description}</Description>

      <ConfirmationButtons>
       
      </ConfirmationButtons>
		</React.Fragment>
	);
};