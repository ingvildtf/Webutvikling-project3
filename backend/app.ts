/*const express = require("express")
const bodyParser = require("body-parser")
const {graphqlHTTP}= require("express-graphql")

//to fetch the graphql schemas
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')


const app = express(); 




app.use(bodyParser.json());

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
    })
);

app.listen(3001);*/