import { gql } from '@apollo/client'

export const GET_RECIPE_QUERY = gql`
  query Recipe {
    recipes {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
    }
  }
`
