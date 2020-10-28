const mongoose = require('mongoose')

//ID,Name,Category,Instruction,Ingredients,Image

const RecipesSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    
    category:{
        type: String,
        required: true,
    },
    instruction:{
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        required: false,
    }
},

    {collection: "recipes"}
);

const Recipes = mongoose.model('Recipes', RecipesSchema)
module.exports = Recipes