/**
 *
 * Created by linmengbo on 16/7/14.
 */

var BlogListItem = require ('../model/BlogListItem')


var Router = require('koa-router');
var router = new Router();

var BlogListItemModel = require ('../model/BlogListItem')
var bodyParser = require ('koa-bodyparser');

//function*create(blogListItem) {
//
//    blogListItem = new BlogListItemModel (blogListItem)
//    return yield blogListItem.save ()
//}

module.exports = {
    router
}

router.post (
    '/addBlog',
    bodyParser (),
    function* (next) {
        var body = this.request.body;
        var blogListItem = {
            title: body.title,
            content: body.content,
            image: body.image
        }
        blogListItem = new BlogListItem (blogListItem)
        yield blogListItem.save()

        if (body.title != null) {
            this.send ({
                success: true,
                result: blogListItem
            });
            yield next;
            return;
        } else {
            this.send ({
                success: false
            });
            yield next;
            return;
        }
        ;
    }
)

