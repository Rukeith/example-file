const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');
const { info, infos } = require('./info');
const { student } = require('./student');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      infos,
      info,
      student
    }
  })
});

module.exports = schema;
