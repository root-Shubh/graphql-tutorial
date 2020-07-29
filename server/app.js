const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema =require('./schema/schema');
const mongoose= require('mongoose');

const app = express();
mongoose.connect('mongodb_connection_url',{useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB Atlas")).catch(err => console.log("Error: ", err.message));

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,()=> {
    console.log('Listening for requests on port 4000')
})
