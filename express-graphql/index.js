const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const users = [
  {
    id: 1,
    name: 'Brian',
    age: '21',
    gender: 'M'
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    gender: 'M'
  },
  {
    id: 3,
    name: 'Joseph',
    age: '23',
    gender: 'M'
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    gender: 'F'
  },
  {
    id: 5,
    name: 'Joy',
    age: '25',
    gender: 'F'
  }
]

const schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(gender: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    gender: String
  },
  type Mutation {
    updateUser(id: Int!, name: String!, age: String): Person
  }
`);

const getUser = (args) => {
  const userID = args.id;
  return users.filter(user => user.id == userID)[0];
}

const retrieveUsers = (args) => {
  const { gender } = args;
  if (gender) {
    return users.filter(user => user.gender === gender);
  } else {
    return users;
  }
}

const updateUser = ({ id, name, age }) => {
  users.map(user => {
    if (user.id === id) {
      user.name = name;
      user.age = age;
      return user;
    }
  });
  return users.filter(user=> user.id === id) [0];
}

const rootValue = { 
  user: getUser,
  users: retrieveUsers,
  updateUser: updateUser
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000, () => console.info('Now browse to localhost:4000/graphql'));