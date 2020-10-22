const express = require('express')
const app = express()
const mongoose = require('mongoose')

const RecipesModel = require("./Recipes.tsx")

const router =express.Router();

var uri ="mongodb://agjes:123@it2810-47.idi.ntnu.no:27017/fooddatabase";

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const conection = mongoose.connection; 

conection.once("open", function(){
  console.log("MongoDB database connection established successfully")
})


app.use("/", router);
router.route("/fetchdata").get( function (req,res) {

});

//route call
app.get('/', async (req, res) => {
    //whenever someone reaches this route want to insert something in the database
    const recipe = new RecipesModel({recipeName: "Wok", hours: 1});
    try{
      //save the information to the database
      await recipe.save();
      res.send("inserted data");
    }catch(err){
      console.log(err)
    }
  })

  app.listen(3001, () => {
    console.log("Server running on port 3001...");
  })
   
  