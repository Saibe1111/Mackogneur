const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Database = require("../../database/database.js");

module.exports = (client) => {

    console.log(`Logged in as ${client.user.tag}!`);

    let nbr = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const db = new Database();

    db.getChannelsWith('logs').then((idsChannel) => {
        idsChannel.forEach(idChannel => {
            const leave = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor('GREEN')
                    .setFooter(`ID: ${client.user.id}`)
                    .addFields(
                        { name: 'Reconnection le :', value: `${moment(new Date()).format('DD/MM/YY')}\n${moment(new Date()).format('HH:mm:ss')}`},
                        { name: 'Visionnaires :', value: `${nbr}`},
                    );
                client.channels.cache.get(idChannel).send(leave);
        });
    });

    db.closeDatabase();
}