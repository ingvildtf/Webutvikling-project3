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
            recipes(offset: Int, limit: Int): [Recipe!]!
            searchRecipes(searchSequence: String!, offset: Int, limit: Int): [Recipe]
            dinner(offset: Int, limit: Int): [Recipe!]!
            dessert(offset: Int, limit: Int): [Recipe!]!
            breakfast(offset: Int, limit: Int): [Recipe!]!
        }
        type RootMutation{
            createRecipe(recipeInput: RecipeInput): Recipe 
            review(id: String!, star: Int!): Recipe
        }
        schema {
            query: RootQuery
            mutation: RootMutation 
        }
    `)
