const Recipes = require("../../recipes.ts")

module.exports = {
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
            recipeName: args.recipeInput.recipeName,
            time: args.recipeInput.time,
            mealType: args.recipeInput.mealType,
            description: args.recipeInput.description,
            ingredients: args.recipeInput.ingredients,
            image: args.recipeInput.image,
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
    },
    getRecipeByType: async args => {
        try{
            const recipe = await Recipes.findById()

        } catch (err){

        }
    }
}