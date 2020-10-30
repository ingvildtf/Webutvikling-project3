const Recipes = require('../../recipes.ts')

module.exports = {
    //Queries 
    
    //function in the resolver 
    //returns all recipes in the database 
    recipes: async args => {
        try {
          const recipes = await Recipes.find().sort({Name: args.sortDecending}).skip(args.offset).limit(15)
    
          return recipes.map(recipe => {
            return { ...recipe._doc, _id: recipe._doc._id.toString() }
          })
        } catch (err) {
          throw err
        }
      },
    
    searchRecipes: async args => {
        try{
            const recipes = await Recipes
            //finds recipes from database that includes the search word 
            .find({Name: {$regex: args.searchSequence, $options: 'i'}},)
            .sort({Name: args.sortDecending}).skip(args.offset).limit(15)
            return recipes.map(recipe =>{
                return {...recipe._doc, _id: recipe._doc._id.toString()
            }
            })
        } catch (err){
            throw err;
        }
    },

    dinner: async (args) =>{
        try{
            const recipes = await Recipes
            .find({$or:[
                {Category: "Chicken" },
                {Category: "Beef"},
                {Category: "Pork"},
                {Category: "Vegeterian"},
                {Category: "Vegan"},
                {Category: "Pasta"},
                {Category: "Seafood"},
                {Category: "Lamb"},
                {Category: "Goat"}
            ]})
            .sort({Name: args.sortDecending}).skip(args.offset).limit(15)
            return recipes.map(recipe =>{
            return {...recipe._doc, _id: recipe._doc._id.toString()
            }
            })
        }catch (err){
            throw err;
        }
    },
    dessert: async (args) =>{
        try{
            const recipes = await Recipes
            .find({Category: "Dessert"})
            .sort({Name: args.sortDecending}).skip(args.offset).limit(15)
            return recipes.map(recipe =>{
            return {...recipe._doc, _id: recipe._doc._id.toString()
            }
            })
        }catch (err){
            throw err;
        }
    },
    breakfast: async (args) =>{
        try{
            const recipes = await Recipes
            .find({Category: "Breakfast"})
            .sort({Name: args.sortDecending}).skip(args.offset).limit(15)
            return recipes.map(recipe =>{
            return {...recipe._doc, _id: recipe._doc._id.toString()
            }
            })
        }catch (err){
            throw err;
        }
    },

    //Mutations
    //creates a new recipes 
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
     },
     review: async (args) => { 
         try{
         //need to return to get a valid result 
         const result = await Recipes.find({ID: args.id})
         .update({$push: {Review: args.star}})
         
             console.log(result);
             //leaves out all the metadata, property delivered by mongoose 
             return {result};
         }
         catch(err) {
             console.log(err);
             throw err; 
         };
     }
}
