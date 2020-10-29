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

export const GET_DINNER_RECIPES = gql`
  query Dinners($offset: Int, $limit: Int) {
    dinner(limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
  }
}`

export const GET_Dessert_RECIPES = gql`
  query Desserts($offset: Int, $limit: Int) {
    dessert(limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
  }
}`

export const GET_BREAKFAST_RECIPES = gql`
  query Breakfasts($offset: Int, $limit: Int) {
    breackfast(limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
  }
}`
export const SEARCH_RECIPES = gql`
  query SearchRecipesQuery($matchedString: String!) {
    searchRecipes(searchSequence: $matchedString) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
  }
}`


