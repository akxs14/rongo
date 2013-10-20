/*
 *  User model
 *
 *  Used for persistence and authorization
 */
var User = function() 
{
  this.pg = require('pg');
  this.connString = "postgres://makis:makis@localhost/rongo";
}

User.prototype.create = function(email, password) 
{
  this.pg.connect(this.connString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    query = "INSERT INTO users(email, username, password) " + "VALUES('" + email + "','moula','" + password + "')";
    client.query(query, function(err, result) {
      done();
      if(err) { return console.error('error running query', err); }
     });
  });
}

User.prototype.delete = function(email)
{
  this.pg.connect(this.connString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("DELETE FROM users WHERE email = " + email, function(err, result) {
        done();

        if(err) {
          return console.error('error running query', err);
        }
       });
  });
}

User.prototype.login = function(email, password)
{
  this.pg.connect(this.connString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT COUNT(email) FROM users WHERE email = " +
      email + " AND password = " + password + ")",
      function(err, result) {
        done();

        if(err) {
          return console.error('error running query', err);
        }
        return result.rows.count == 1
      });
  });
}

module.exports = User;