const sqlite3 = require('sqlite3').verbose();

class Database {

    static databasePath = 'database/database.db';

    database;

    constructor(){

        this.database = new sqlite3.Database(Database.databasePath, (err) => {
            if (err) {
              return console.error(err.message);
            }
          });
    }

    closeDatabase(){
      this.database.close();
    }

    getRoles(role){
        return new Promise((resolve, reject) => {
            let result = []
            this.database.each(`SELECT * FROM Roles WHERE "${role}"=1;`, (err, row) => {
              if(err) { reject(err) }
              result.push(row.ID)
            }, () => {
              resolve(result)
            });
        });
    }

    getChannelsWith(permission){
        return new Promise((resolve, reject) => {
            let result = []
            this.database.each(`SELECT ID_Channel FROM Channel_Permissions where ID_Permission ='${permission}';`, (err, row) => {
              if(err) { reject(err) }
              result.push(row.ID_Channel)
            }, () => {
              resolve(result)
            })
        });
    }

    getUserWhoPing(){
        return new Promise((resolve, reject) => {
          let result = []
          this.database.each(`SELECT * FROM UserWhoPing;`, (err, row) => {
            if(err) { reject(err) }
            result.push(row)
          }, () => {
            resolve(result)
          })
        });
    }

    getPingUser(userWhoPing){
      return new Promise((resolve, reject) => {
        let result = []
        this.database.each(`SELECT pu.ID, pu.Cooldown FROM PingUser pu JOIN PingFor pf ON pu.ID = pf.ID_User WHERE pf.ID_UserWhoPing="${userWhoPing}"`, (err, row) => {
          if(err) { reject(err) }
          result.push(row)
        }, () => {
          resolve(result);
        })
      });
  }

}

module.exports = Database;