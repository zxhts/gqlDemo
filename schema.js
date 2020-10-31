/**
 * @author zhaoxianhe
 * @description a mutation graphql Scheme
 */
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');
const { text } = require('express');

const JokeType = new GraphQLObjectType({
    name: 'Joke',
    fields: () => ({
       sid: { type: GraphQLString },
       text : { type: GraphQLString },
       type : { type: GraphQLString }
    })
})

const JokeQuery = new GraphQLObjectType({
  name: 'JokeQueryType',
  fields: {   
    Joke: {
      type: JokeType,
      resolve() {
        return axios.get(`https://api.apiopen.top/getJoke?page=1&count=2&type=video`)
        .then(res => res.data.result[0]);
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: JokeQuery
});


// const MessageInputType = new GraphQLObjectType({
//    name: 'MessageInput',
//    fields: () => ({
//       content : { type :GraphQLString },
//       author: { type: GraphQLString },
//    })
// })

// const MessageType = new GraphQLObjectType({
//    name: 'Message',
//    fields: () => ({
//       id : { type :GraphQLString },
//       content : { type :GraphQLString },
//       author: { type: GraphQLString },
//    })
// })
