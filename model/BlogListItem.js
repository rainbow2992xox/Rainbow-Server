/**
 * Created by linmengbo on 16/7/14.
 */
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    title: {type: String, default: '标题'},
    content: {type: String, default: '博主很懒什么都没留下'},
    image: {type: String, default: null}
}, {
    versionKey: false,
    collection: 'blogItem',
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})

schema.index ({title: 1})
module.exports = mongoose.model ('blogItem', schema)