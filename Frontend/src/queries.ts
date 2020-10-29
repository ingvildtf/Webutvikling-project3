import { gql } from '@apollo/client'

export const GET_RECIPE_QUERY = gql`
  query Recipes($offset: Int, $limit: Int) {
    recipes(limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
    }
  }
`
