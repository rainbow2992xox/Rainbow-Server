/**
 * Created by linmengbo on 16/7/14.
 */
var mongoose = require ('mongoose')
var config = require ('../config')


var openPromise = null

module.exports = {
    *open () {
        if (!openPromise) {
            mongoose.connect (config.mongodbUrl)
            openPromise = new Promise ((resolve, reject) => {
                var db = mongoose.connection
                db.on ('error', e => {
                    console.log ('mongodb错误: ')
                    console.log (e)
                    reject (e)
                })
                db.once ('open', () => {
                    console.log ('mongodb ' + config.mongodbUrl + ' 打开成功')
                    resolve ()
                })
            })
        }

        yield openPromise
    },

    *close () {
        mongoose.connection.close ()
    }
}