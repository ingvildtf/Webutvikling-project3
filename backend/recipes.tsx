const mongoose = require('mongoose')

const RecipesSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    mealType:{
        type: String,
        required: true,
    },
    description:{
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