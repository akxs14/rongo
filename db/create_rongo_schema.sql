/* 
 * execute with:
 * psql --username=postgres -W -h localhost -c rongo -f create_rongo_schema.sql
 */

/*
 * Create Users table. Structure:
 * ------------------------------
 *  id: key
 *  email: varchar
 *  username: varchar, user identification
 *  password: varchar, 
 */
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  email    VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR
);


/*
 * Create SubscriptionPlans table. Structure:
 * ------------------------------
 *  id: serial
 *  name: varchar
 *  description: varchar
 *  duration: integer, plan duration in days 
 */
DROP TABLE IF EXISTS subscription_plans;
CREATE TABLE subscription_plans (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR NOT NULL UNIQUE,
  description VARCHAR NOT NULL,
  duration    INTEGER NOT NULL
);


/*
 * Create PaymentMethods table. Structure:
 * ------------------------------
 *  id: serial
 *  title: varchar
 *  description: varchar
 */
DROP TABLE IF EXISTS payment_methods;
CREATE TABLE payment_methods (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR NOT NULL,
  description VARCHAR NOT NULL
);


/*
 * Create UserSubscriptions table. Structure:
 * ------------------------------
 *  user_id: serial
 *  subscr_plan_id:    serial
 *  payment_method_id: serial
 *  paid: boolean
 *  start_date: date
 *  end_date:   date 
 */
DROP TABLE IF EXISTS user_subscriptions;
CREATE TABLE user_subscriptions (
  user_id           INTEGER NOT NULL REFERENCES rongo.users.id,
  subscr_plan_id    INTEGER NOT NULL REFERENCES rongo.subscriptionplans.id,
  payment_method_id INTEGER NOT NULL REFERENCES rongo.paymentmethods.id,
  paid BOOLEAN NOT NULL,
  start_date DATE NOT NULL,
  end_date   DATE NOT NULL
);
