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

    getNumberQuestions(){
      return new Promise((resolve, reject) => {
        this.database.get(`SELECT count(ID) FROM Questions;"`, (err, row) => {
          if(err) { reject(err) }
          resolve(row['count(ID)']);
        });
      });
    }

    userExist(id){
      return new Promise((resolve, reject) => {
        this.database.get(`SELECT count(UserID) FROM UserQuestion WHERE UserID="${id}";`, (err, row) => {
          if(err) { reject(err) }
          resolve(row['count(UserID)'] === 1);
        });
      });
    }

    getQuestion(id){
      return new Promise((resolve, reject) => {
        this.database.get(`SELECT  q.Question, q.Answers, q.GoodAnswer FROM Questions q, UserQuestion uq  ON uq.QuestionID = q.ID WHERE uq.UserID="${id}" ;`, (err, row) => {
          if(err) { reject(err) }
          resolve(row);
        });
      });
    }

    addUserQuestion(username, id, question){
      this.database.run(`INSERT INTO UserQuestion VALUES("${username}", "${id}", ${question}, 1);`);
    }

    removeUserQuestion(id){
      this.database.run(`DELETE FROM UserQuestion WHERE UserID = "${id}";`);
    }

    updateUserQuestion(id, question, numberTry){
      this.database.run(`UPDATE UserQuestion SET QuestionID="${question}", NumberOfQuestion="${numberTry}" WHERE UserID = "${id}";`);
    }

    getUserNumberTry(id){
      return new Promise((resolve, reject) => {
        this.database.get(`SELECT NumberOfQuestion FROM UserQuestion WHERE UserID="${id}";`, (err, row) => {
          if(err) { reject(err) }
          resolve(row['NumberOfQuestion']);
        });
      });
    }

    

}

module.exports = Database;