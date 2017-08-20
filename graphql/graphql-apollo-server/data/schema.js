import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
// import mocks from './mocks'

// Define schema
const typeDefs = `
type Author {   # author's content is : id, name and published posts
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {    # Post's content is below, include the post's author
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
# Define query content
type Query {
  author(firstName: String, lastName: String): Author # Query author info
  getFortuneCookie: String
}
`;

// const schema = makeExecutableSchema({ typeDefs });

// Use this tool to add mock data
// addMockFunctionsToSchema({ schema, mocks });

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
