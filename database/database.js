const sqlite3 = require('sqlite3').verbose();

class Database {

    static databasePath = "database.db";

    constructor(){

        let db = new sqlite3.Database(Database.databasePath, (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Connected to the database.');
          });
    }

}

module.exports = Database;