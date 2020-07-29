const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema =require('./schema/schema');
const mongoose= require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://new_user1:pwd2020@cluster0.bzkcd.mongodb.net/cluster0?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB Atlas")).catch(err => console.log("Error: ", err.message));

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,()=> {
    console.log('Listening for requests on port 4000')
})