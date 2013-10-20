/*
 *  User model
 *
 *  Used for persistence and authorization
 */
function User() 
{
  this.pg = require('pg');
  this.connString = "postgres://makis:makis@localhost/postgres";
}

User.prototype.create = function(email, username, password) 
{
  this.pg.connect(this.connString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("INSERT IN users(email, username, password) " +
      "VALUES(" + email + "," + username + "," + password + ")",
      function(err, result) {
        done();

        if(err) {
          return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
      });
  });
}

prototype.delete = function(email)
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
        console.log(result.rows[0]);
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