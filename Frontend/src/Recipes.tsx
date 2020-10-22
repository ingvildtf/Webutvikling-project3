
const mongoose = require('mongoose')

const RecipesSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
},

    {collection: "recipes"}
);

const Recipes = mongoose.model('Recipes', RecipesSchema)
module.exports = Recipes

