const graphql = require('graphql');
const{GraphQLObjectType, GraphQLString, GraphQLSchema}=graphql;
const _= require('lodash');

const BookType =new GraphQLObjectType ({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        genre: {type: GraphQLString},
    })
});

//dummyData
var books=[
    {name: 'ac', genre:'hype',id:'1'},
    {name: 'ad', genre:'fantasy',id:'2'},
    {name: 'ae', genre:'adventure',id:'3'},
    {name: 'af', genre:'action',id:'4'},
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytype',
    fields:{
        book:{
            type: BookType,
            args:{id:{type: GraphQLString}},
            resolve(parent, args){
               return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});