const graphql = require('graphql');

const{
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
}=graphql;
const _= require('lodash');

//dummyData
var books=[
    {name: 'ac', genre:'hype',id:'1', authorId:'2'},
    {name: 'ad', genre:'fantasy',id:'2', authorId:'1'},
    {name: 'ae', genre:'adventure',id:'3', authorId:'2'},
    {name: 'af', genre:'action',id:'4', authorId:'3'},
    {name: 'ag', genre:'action',id:'5', authorId:'3'},
    {name: 'ah', genre:'romance',id:'6', authorId:'1'},
];

var authors =[
    {name: 'abc', age: 100, id:'1'},
    {name: 'def', age: 24, id:'2'},
    {name: 'ghi', age: 45, id:'3'},
];

const BookType =new GraphQLObjectType ({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre: {type: GraphQLString},
        authorId:{type: GraphQLID},
        author:{
            type:AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors,{id: parent.authorId});
            }
        }
    })
});

const AuthorType =new GraphQLObjectType ({
    name:'Author',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        age: {type: GraphQLInt},
        book:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books,{authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytype',
    fields:{
        book:{
            type: BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
               return _.find(books, {id: args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});