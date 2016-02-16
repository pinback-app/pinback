var db = require('./db/index.js');

var add = function(venueObj, callback) {
  //check if venue is in db
  check(venueObj, addVenue, callback);
}

var check = function(venueObj, addCallback, callback) {
  var params = [venueObj.id];
  var sql = 'SELECT * FROM `venues` WHERE id = ?';
  db.queryHelper(sql, params, function(err, results) {
    if (err) {
      callback(err);
    } else {
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        addCallback(venueObj, callback);
      }
    }
  });
}

var addVenue = function(venueObj, callback) {

  var params = [
    venueObj.id,
    venueObj.url,
    venueObj.name,
    venueObj.city,
    venueObj.region,
    venueObj.country,
    venueObj.latitude,
    venueObj.longitude
  ];

  var sql = 'INSERT INTO `venues` \
            (`id`, `url`, `name`, `city`, `region`, `country`, `latitude`, `longitude`) \
              VALUES \
            (?, ?, ?, ?, ?, ?, ?, ?);'

  db.queryHelper(sql, params, function(err, results) {
    if (err) {
      callback(err);
    } else {
      params = [venueObj.id];
      sql = 'select * from venues where venues.id = ?;'
      db.queryHelper(sql, params, function(err, results) {
        //return inserted record
        if (err) {
          callback(err);
        } else {
          callback(null, results[0]);
        }
      });
    }
  });
}

var remove = function(id, callback) {
  var params = [id];
  var sql = 'DELETE FROM `venues` where id = (?);'

  db.queryHelper(sql, params, function(results) {
    callback(null,results[0]);
  });
}

module.exports.add = add;
module.exports.remove = remove;
