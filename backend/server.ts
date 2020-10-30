const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const {graphqlHTTP}= require("express-graphql")

//const RecipesModel = require("./Recipes.ts")
//to fetch the graphql schemas
const graphQlSchema = require('./graphql/schema/index.ts')
const graphQlResolvers = require('./graphql/resolvers/index.ts')

const app = express()
//app.use(bodyParser.json)

//Vet ikke om denne funker!!! 
//allow cross origin request. * every hos, client, location can sendt request to this server
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  //control which kind of request they can make 
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  //controls which kind of header we can set for the request we are sending to that server
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  //for optionsrequest want to respond 200 
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200);
  }
  next(); 
})

const router = express.Router();

var uri =`mongodb://agjes:123@it2810-47.idi.ntnu.no:27017/fooddatabase`;

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
/*app.get('/', async (req, res) => {
    //whenever someone reaches this route want to insert something in the database
    const recipe = new RecipesModel({recipeName: "Spagetti", time: 1, mealType: "dinner", description: "Dette er digg", ingredients: "Vegtables, noodels and meat"});
    try{
      //save the information to the database
      await recipe.save();
      res.send("inserted data");
    }catch(err){
      console.log(err)
    }
  })*/
  
app.use(
  '/graphql', 
  graphqlHTTP({
  //point at a graphql Schema, query for fetching data and mutation for changing data
  //graphql is a type language 
  schema: graphQlSchema,
  //point at a object that have all the resolverfunctions, the resolverfunction need to match our schema endpoint in name 
  //
  rootValue: graphQlResolvers,
  graphiql: true
  }), 
  bodyParser
);

  app.listen(3001, () => {
    console.log("Server running on port 3001...");
  })