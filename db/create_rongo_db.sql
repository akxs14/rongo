/* 
 * execute with:
 * psql --username=postgres -W -h localhost -f create_rongo_db.sql
 */

/*
 * Create Rongo database. Tables:
 * ------------------------------
 *  Users: The application's registered users
 *  SubscriptionPlans: The available subscription plans a user can subscribe in
 *  UserSubscriptions: Users' subscription information (selected plan, start date)
 *  PaymentMethods:     The available payment methods for the uses plans 
 */
CREATE DATABASE rongo
WITH OWNER       = postgres
TEMPLATE         = template0
ENCODING         = 'UTF-8'
LC_COLLATE       = 'C'
LC_CTYPE         = 'C'
TABLESPACE       = pg_default
CONNECTION LIMIT = -1;

/*
 * Create Users table. Structure:
 * ------------------------------
 *  id: key
 *  email: varchar
 *  username: varchar, user identification
 *  password: varchar, 
 */
CREATE TABLE Users (
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
CREATE TABLE SubscriptionPlans (
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
CREATE TABLE PaymentMethods (
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
CREATE TABLE UserSubscriptions (
  -- user_id           INTEGER NOT NULL REFERENCES Users.id,
  -- subscr_plan_id    INTEGER NOT NULL REFERENCES SubscriptionPlans.id,
  -- payment_method_id INTEGER NOT NULL REFERENCES PaymentMethods.id,
  paid BOOLEAN NOT NULL,
  start_date DATE NOT NULL,
  end_date   DATE NOT NULL
);

DROP DATABASE rongo;
