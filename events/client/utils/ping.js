const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Database = require("../../../database/database.js");

const pingTimeList = new Map();

function intervalFunc() {
    pingTimeList.forEach((values, keys) => {
        pingTimeList.delete(keys);
    });
}
setInterval(intervalFunc, 3600000);

module.exports.run = (message, client) =>{

    const db = new Database();

    db.getUserWhoPing().then((Users) => {
        Users.forEach(User => {
            if(User.ID === message.author.id){
                db.getPingUser(User.ID).then((PingUsers) => {
                    PingUsers.forEach(PingUser => {
                        if ( (PingUser.Cooldown === 0) || !( pingTimeList.has(User.ID) ) ) {
                            try {
                                const ping = new MessageEmbed()
                                    .setColor('BLUE')
                                    .setTitle(`:loudspeaker: ${User.Name} a envoyé un message !`)
                                    .setDescription(`'${message.content}'`)
                                    .addFields(
                                        { name: 'LE:', value: `${moment(message.createdAt).format('DD/MM/YY')}`, inline: true },
                                        { name: 'A:', value: `${moment(message.createdAt).format('HH:mm:ss')}`, inline: true }
                                    );
                                client.users.cache.get(PingUser.ID).send(ping);
                            } catch (error) {
                                console.log(`Fail ID : ${PingUser.ID}`)
                            }
                        }
                    });
                    pingTimeList.set(User.ID, User.Name);
                });
            }
        });
    });

    db.closeDatabase();

}