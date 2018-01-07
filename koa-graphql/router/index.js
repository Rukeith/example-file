const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');
const { saveInfo, fetchInfo } = require('../controllers/info');
const { saveStudent, fetchStudent, fetchStudentDetail } = require('../controllers/student');
const schema = require('../graphql/schema');

const router = require('koa-router')();

router.post('/saveinfo', saveInfo)
  .get('/info', fetchInfo)
  .post('/savestudent', saveStudent)
  .get('/student', fetchStudent)
  .get('/studentDetail', fetchStudentDetail);

router.post('/graphql', async (ctx, next) => {
    await graphqlKoa({ schema })(ctx, next);
  })
  .get('/graphql', async (ctx, next) => {
    await graphqlKoa({ schema })(ctx, next);
  })
  .get('/graphiql', async (ctx, next) => {
    await graphiqlKoa({ endpointURL: '/graphql' })(ctx, next);
  })

module.exports = router;
