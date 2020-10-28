//***HENTET FRA: https://www.themealdb.com/api.php?fbclid=IwAR2tMGOyFDumMiFTh4shJwZc2W2jrQgicS7F3EpQQsGq-S3mZeU8Sw6_5Es
//Script for å hente ut API-et med mange oppskrifter :')

const fetch = require("node-fetch");
//const fs = require("fs");

let recipeArray = [];

let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var arrayLength = alphabet.length;


const getRecipes = async  (letter) => {
    try{
            await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((res) => res)
            .then(res => res.json())
            .then(meal => {
                for(let i=0; i < meal.meals.length; i ++){
            //mealsEl.innerHTML = data.meals.map(meal => {
                const recipe = {
                    ID: meal.meals[i].idMeal,
                    name: meal.meals[i].strMeal,
                    category: meal.meals[i].strCategory,
                    instructions: meal.meals[i].strInstructions,
                    ingredients: Ingredients(meal.meals[i]),
                    imageUrl: meal.meals[i].strMealThumb,
                    
                };
                recipeArray.push(recipe);
                console.log(recipe);
            }
            })
        }catch(err){
            console.log(err)
        }
}

for (let i=0; i< arrayLength; i++) {
    getRecipes(alphabet[i]);
    console.log("Det funker");
  }



function Ingredients(meal){
    const ingredients = [];
    for (let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }

    return ingredients;

    
}


const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
    
    path: 'recipe_array.csv',

    header: [
        { id: "ID", title: "ID" },
        { id: "name", title: "Name" },
        { id: "category", title: "Category" },
        { id: "instructions", title: "Instruction" },
        { id: "ingredients", title: "Ingredients" },
        { id: "imageUrl", title: "Image" },
      ],
    
});


 
setTimeout(
    () =>
      csvWriter.writeRecords(recipeArray).then(() => {
        console.log("The CSV file was written successfully");
      }),
    10000
  );



