const {buildSchema} = require('graphql'); 

module.exports = buildSchema(`
        type Recipe {
            _id: ID!
            ID: String!
            Name: String!
            Category: String!
            Instruction: String
            Ingredients: String!
            Image: String
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
            recipes: [Recipe!]!
            searchRecipes(category: String!): Recipe
        }
        type RootMutation{
            createRecipe(recipeInput: RecipeInput): Recipe 
        }
        schema {
            query: RootQuery
            mutation: RootMutation 
        }
    `)