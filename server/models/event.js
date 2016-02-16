var db = require('./db/index.js');

var add = function(eventObj, callback) {
  //check if event is in db
  check(eventObj, addEvent, callback);
}

var check = function(eventObj, addCallback, callback) {
  var params = [eventObj.id];
  var sql = 'SELECT * FROM `events` WHERE id = ?';
  db.queryHelper(sql, params, function(err, results) {
    if (err) {
      callback(err);
    } else {
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        addCallback(eventObj, callback);
      }
    }
  });
}

var addEvent = function(eventObj, callback) {
  var dt = new Date(eventObj.date_time);

  var params = [
    eventObj.id,
    eventObj.artists,
    dt,
    eventObj.ticket_url,
    eventObj.venue_id
  ];

  var sql = 'INSERT INTO `events` \
                (id, `artists`, `date_time`, `ticket_url`, `venue_id`) \
                VALUES (?, ?, ?, ?, ?);'
  

  db.queryHelper(sql, params, function(err, results) {
    if (err) {
      callback(err);
    } else {
      params = [eventObj.id];
      sql = 'select * from events where events.id = ?;'
      db.queryHelper(sql, params, function(err, results) {
        if (err) {
          callback(err);
        } else {
          //return inserted record
          callback(null, results[0]);
        }
      });
    }
  });
}

var remove = function(id, callback) {
  var params = [id];
  var sql = 'DELETE FROM `events` where id = (?);'

  db.queryHelper(sql, params, function(err, results) {
    callback(null, results[0]);
  });
}


module.exports.add = add;
module.exports.remove = remove;
