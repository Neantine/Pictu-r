/**
 * @param params {user_id, url, [from: timestamp]}
 * @param cb
 */
module.exports.getMetrics = function(params, cb) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/metricsapi';

    MongoClient.connect(url, function(err, db) {
        if(err) { return cb(err, null); }

        const pipeline = [];

        if(params.from) {
            pipeline.push( {$match:{page:params.url,user:params.user_id, instant: {$gt: params.from}}});
        } else {
            pipeline.push({$match:{page:params.url,user:params.user_id }})
        }

        pipeline.push({$group:{_id:{x:"$x",y:"$y"},total:{$sum:1}}},{$project: {_id:0, x:"$_id.x", y:"$_id.y", total:1 }});

        db.collection('metrics')
            .aggregate(pipeline, function(err, results) {
                db.close();
                if(err) { return cb(err, null); }
                cb(null, results);
        });
    });
};


module.exports.insertMetrics = function(metrics, cb) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/metricsapi';

    MongoClient.connect(url, function(err, db) {
        if(err) { return cb(err, null); }

        db.collection('metrics').insertMany(metrics, function(err, results) {
            db.close();

            if(err) { return cb(err, null); }
            cb(null, results);
        });
    });
};