import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './data/schema';

const graphQLServer = express();
const GRAPHQL_PORT = 3002;

graphQLServer.use('*', cors({ origin: 'http://localhost:51404' })); // Notice：this need to change to clinet side's port
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
));
