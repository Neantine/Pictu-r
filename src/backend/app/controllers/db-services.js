/**
 * POST /metrics
 * Accepte du Content-Type: application/json
 *
 * Stocke les metrics dans la couche de persistence
 *
 * return 201
 */

const picturDb = require('../models/db/metricsDb');

module.exports = function (req, res, next) {

  const jsonPayload = req.body;
  // TODO verifier que jsonPayload est un tableau de metrics au bon format sinon => bad request

  picturDb.insertMetrics(jsonPayload, function(err, result){
    if(err) {
      console.log(err);
      return next(err);
    }

    res.send(201);
    return next();
  });

};
