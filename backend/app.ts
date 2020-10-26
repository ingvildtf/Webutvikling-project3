const express = require("express")
const bodyParser = require("body-parser")
const {graphqlHTTP}= require("express-graphql")
const {buildSchema} = require("graphql")


const app = express(); 

const events = [];

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphqlHTTP({
    //point at a graphql Schema, query for fetching data and mutation for changing data
    //graphql is a type language 
    schema: buildSchema(`
        type Event {
            _id: ID!
            recipeName: String!
            time: Float!
            mealType: String!
            description: String!
            ingredients: String!
            image: String
        }
        input EventInput{
            recipeName: String!
            time: Float!
            mealType: String!
            description: String!
            ingredients: String!
            image: String
        }
        type RootQuery{
            events: [Event!]!
        }
        type RootMutation{
            createEvent(eventInput: EventInput): Event 
        }
        schema {
            query: RootQuery
            mutation: RootMutation 
        }
    `),
    //point at a object that have all the resolverfunctions, the resolverfunction need to match our schema endpoint in name 
    //
    rootValue: {
        //events a function in the resolver 
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random.toString(),
                recipeName: args.eventInput.recipeName,
                time: args.eventInput.time,
                mealType: args.eventInput.mealType,
                description: args.eventInput.description,
                ingredients: args.eventInput.ingredients,
                image: args.eventInput.image,
            } 
            events.push(event);
            return event; 
        }
    },
    graphiql: true
    })
);

app.listen(4000);