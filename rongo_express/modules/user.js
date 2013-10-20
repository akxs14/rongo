/*
 *  User model
 *
 *  Used for persistence and authorization
 */
var User = function() 
{
  this.pg = require('pg');
  this.connString = "postgres://makis:makis@localhost/postgres";
}

User.prototype.create = function(email, password) 
{
  console.log("kou kou!: " + email + "," + password);
  // this.pg.connect(this.connString, function(err, client, done) {
  //   if(err) {
  //     return console.error('error fetching client from pool', err);
  //   }
  //   client.query("INSERT IN users(email, password) " +
  //     "VALUES(" + email + "," + password + ")",
  //     function(err, result) {
  //       done();

  //       if(err) {
  //         return console.error('error running query', err);
  //       }
  //       console.log(result.rows[0].number);
  //     });
  // });
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

module.exports = User;