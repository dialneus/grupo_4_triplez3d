module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "eCommerce-3DZ",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port" : "8889" // <-- Eliminar si no es usuario Mac
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
