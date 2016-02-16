var db = require('./db/index.js');

var add = function(name, callback) {
  var params = [name];
  var sql = 'INSERT INTO `users` (`name`) VALUES (?);'

  db.queryHelper(sql, params, function(err, results) {
    if (err) {
      callback(err);
    } else {
      params = [results.insertId];
      sql = 'select * from users where users.id = ?;'
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
  var sql = 'DELETE FROM `users` where id = (?);'

  db.queryHelper(sql, params, function(results) {
    callback(null, results[0]);
  });
}

module.exports.add = add;
module.exports.remove = remove;
