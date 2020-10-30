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
      Review
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
      Review
  }
}`

export const GET_DESSERT_RECIPES = gql`
  query Desserts($offset: Int, $limit: Int) {
    dessert(limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
  }
}`

export const GET_BREAKFAST_RECIPES = gql`
  query Breakfasts($offset: Int, $limit: Int) {
    breakfast(limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
  }
}`
export const SEARCH_RECIPES = gql`
  query SearchRecipesQuery($matchedString: String!, $offset: Int, $limit: Int) {
    searchRecipes(searchSequence: $matchedString, limit: $limit, offset: $offset) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
  }
}`

export const ADD_REVIEW = gql `
  mutation AddReview($matchedString: String!, $addReview: Int!){
    review(id: $matchedString, star: $addReview){
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
    }
  }
`

