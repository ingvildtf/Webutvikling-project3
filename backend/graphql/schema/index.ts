const {buildSchema} = require('graphql'); 

module.exports = buildSchema(`
        type Recipe {
            _id: ID!
            recipeName: String!
            time: Float!
            mealType: String!
            description: String!
            ingredients: String!
            image: String
        }
        input RecipeInput{
            recipeName: String!
            time: Float!
            mealType: String!
            description: String!
            ingredients: String!
            image: String
        }
        type RootQuery{
            recipes: [Recipe!]!
        }
        type RootMutation{
            createRecipe(recipeInput: RecipeInput): Recipe 
        }
        schema {
            query: RootQuery
            mutation: RootMutation 
        }
    `)