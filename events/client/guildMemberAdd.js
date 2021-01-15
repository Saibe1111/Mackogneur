const sendQuestion = require('./utils/sendQuestion.js');
const Database = require("../../database/database.js");

module.exports = (client, member) => {

    const db = new Database();
    db.getRoles('Join').then((idsRole) => {

        idsRole.forEach(idRole => {

            let join = member.guild.roles.cache.get(idRole);
            member.roles.add(join);
            sendQuestion.run(member);

        });
    });

    db.closeDatabase();
    
}
