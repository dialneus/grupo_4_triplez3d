module.exports = {
  "development": {
    "username": "root",
    "password":"root",//si tiene claves
    "database": "eCommerce-3DZ",
    "host": "localhost",
    "dialect": "mysql",
    "port" : "8889" //habilitarlo para mac
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}