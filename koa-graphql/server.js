const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const { database } = require('./mongodb');
database();

const api = require('./router');

const app = new Koa()
const router = new Router();

app.use(bodyParser())
  .use(KoaStatic(__dirname + '/public'))
  .use(router.routes())
  .use(router.allowedMethods());

router.use('', api.routes());

app.listen(4000);

console.log('graphQL server listen port: ' + 4000)