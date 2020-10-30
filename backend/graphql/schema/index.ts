const { buildSchema } = require('graphql')

//GraphQL schema, with similar fields as in the database

module.exports = buildSchema(`
        type Recipe {
            _id: ID!
            ID: String!
            Name: String!
            Category: String!
            Instruction: String
            Ingredients: String!
            Image: String
            Review: [Int]
        }
        input RecipeInput{
            ID: String!
            name: String!
            category: String!
            instruction: String
            ingredients: String!
            image: String
        }
        
        type RootQuery{
            recipes(offset: Int, limit: Int, sortDecending: Int): [Recipe!]!
            searchRecipes(searchSequence: String!, offset: Int, limit: Int, sortDecending: Int): [Recipe]
            dinner(offset: Int, limit: Int, sortDecending: Int): [Recipe!]!
            dessert(offset: Int, limit: Int, sortDecending: Int): [Recipe!]!
            breakfast(offset: Int, limit: Int, sortDecending: Int): [Recipe!]!
            reviews(id: String!): Recipe
        }
        type Result{
            result: Int
        }
        type RootMutation{
            createRecipe(recipeInput: RecipeInput): Recipe 
            addReview(id: String!, star: Int): Result
        }
        schema {
            query: RootQuery
            mutation: RootMutation 
        }
    `)
