/**
 * Created by linmengbo on 16/7/14.
 */
var koa = require('koa');
var app = koa();
var mongoDB = require ('./db/MongoDB')
var Router = require('koa-router');
var router = new Router();
var addBlogRouter = require ('./routes/addBlog').router
var co = require('co')

app.use(function* (next) {
    this.send = (body) => {
        this.status = 200;
        this.body = JSON.stringify(body);
        this.type = 'json';
    };
    this.set('Access-Control-Allow-Origin', this.headers['origin']);
    this.set('Access-Control-Allow-Credentials', 'true');
    this.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    this.set('Access-Control-Allow-Headers', 'Content-Type');
    yield next;
});


co(function* () {

    yield mongoDB.open()
    app
        .use(addBlogRouter.middleware())
    app.listen(3000)

}).catch(e => {
    console.log(e)
})



