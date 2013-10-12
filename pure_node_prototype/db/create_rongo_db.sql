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
DROP DATABASE IF EXISTS rongo;
CREATE DATABASE rongo
WITH OWNER       = postgres
TEMPLATE         = template0
ENCODING         = 'UTF-8'
LC_COLLATE       = 'C'
LC_CTYPE         = 'C'
TABLESPACE       = pg_default
CONNECTION LIMIT = -1;
-- DROP DATABASE rongo;
