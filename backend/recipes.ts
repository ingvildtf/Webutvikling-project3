const mongoose = require('mongoose')

//Mongoose Schema that is used as the fields in the database 
//ID,Name,Category,Instruction,Ingredients,Image

const RecipesSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    
    Category:{
        type: String,
        required: true,
    },
    Instruction:{
        type: String,
        required: true,
    },
    Ingredients: {
        type: String,
        required: true,
    }, 
    Image: {
        type: String,
        required: false,
    },
    Review: {
        type: [Number],
<<<<<<< HEAD
        required: false,
=======
        required: false 
>>>>>>> develop
    }
},

    {collection: "recipes"}
);

const Recipes = mongoose.model('Recipes', RecipesSchema)
module.exports = Recipes