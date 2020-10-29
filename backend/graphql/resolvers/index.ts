const Recipes = require("../../recipes.ts")

module.exports = {

    //Queries 
    
    //events a function in the resolver 
    recipes: async () => {
        try{
        const recipes = await Recipes.find()
        return recipes.map(recipe =>{
            return {...recipe._doc, _id: recipe._doc._id.toString()
            }
            })
        }catch (err){
            throw err; 
        }
    },
    
    searchRecipes: async args => {
        try{
            const recipes = await Recipes
            //finds recipes from database that includes the search word 
            .find({$or: [
               {Name: {$regex: args.searchSequence, $options: 'i'}}, 
                {Category: {$regex: args.searchSequence, $options: 'i'}}
            ]
            })
            return recipes.map(recipe =>{
            return {...recipe._doc, _id: recipe._doc._id.toString()
            }
            })
        } catch (err){
            throw err;
        }
    },

    //Mutations
    
    createRecipe: async (args) => {
        /* const event = {
             _id: Math.random.toString(),
             recipeName: args.eventInput.recipeName,
             time: args.eventInput.time,
             mealType: args.eventInput.mealType,
             description: args.eventInput.description,
             ingredients: args.eventInput.ingredients,
             image: args.eventInput.image,
         } */
         const recipe = new Recipes({
             ID: args.recipeInput.ID,
             Name: args.recipeInput.name,
             Category: args.recipeInput.category,
             Instruction: args.recipeInput.instruction,
             Ingredients: args.recipeInput.ingredients,
             Image: args.recipeInput.image,
         });
         
         try{
         //need to return to get a valid result 
         const result = await recipe
         .save()
             console.log(result);
             //leaves out all the metadata, property delivered by mongoose 
             return {...result._doc, _id: result._doc._id.toString()};
         }
         catch(err) {
             console.log(err);
             throw err; 
         };
     }
}