const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Database = require("../../database/database.js");

module.exports = (client, member) => {
    const db = new Database();

    db.getChannelsWith('leave_logs').then((idsChannel) => {
        idsChannel.forEach(idChannel => {
            let nbr = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
                let today = moment(new Date());
                let joinedDate = moment(member.joinedAt);

                const leave = new MessageEmbed()
                    .setAuthor(`${member.displayName}`, member.user.displayAvatarURL())
                    .setColor('RED')
                    .setFooter(`ID: ${member.id}`)
                    .setDescription(`Vient de quitter le serveur.\nIl avait rejoint le : **${joinedDate.format('DD/MM/YY')}** soit il y a : **${today.diff(joinedDate, 'days')} jours**\nNous sommes maintenant : **${nbr}**`);
            client.channels.cache.get(idChannel).send(leave);
        });
    });

    db.removeUserQuestion(member.id);
    db.closeDatabase();

}