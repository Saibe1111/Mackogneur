const { MessageEmbed } = require('discord.js');
const { PREFIX } = require("../../config.json");
const Database = require("../../database/database.js");

module.exports.help = {
    name: 'help',
    aliases: ["h"],
    description: 'Affiche toute les commandes.',
    botIdArg: true,
    usage: 'Pokemon',
    args: true,
    admin: false
}

module.exports.run = (client, message, args) => {

    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
        .setTitle(`__${client.user.username} aide__`)
        .setFooter(`___________________________________________\nListe de toute les commandes de ${client.user.username}`)
        .setColor('BLUE');

    commands.forEach((cmd) => {
        if (!cmd.help.admin) {
            if (cmd.help.usage === '') {
                helpEmbed.addField(
                    `${PREFIX}${cmd.help.name}`,
                    `${cmd.help.description}`, false
                );
            } else {
                helpEmbed.addField(
                    `${PREFIX}${cmd.help.name} {${cmd.help.usage}}`,
                    `${cmd.help.description}`, false
                );
            }
        }
    });

    let helpAdminEmbed = new MessageEmbed()
        .setTitle(`__${client.user.username} aide admin__`)
        .setFooter(`_________________________________________________\nListe de toute les commandes admin de ${client.user.username}`)
        .setColor('ORANGE');

    commands.forEach((cmd) => {

        if (cmd.help.admin) {
            if (cmd.help.usage === '') {
                helpAdminEmbed.addField(
                    `${PREFIX}${cmd.help.name}`,
                    `${cmd.help.description}`, false
                );
            } else {
                helpAdminEmbed.addField(
                    `${PREFIX}${cmd.help.name} {${cmd.help.usage}}`,
                    `${cmd.help.description}`, false
                );
            }
        }
    });

    message.channel.send(helpEmbed);

    const db = new Database();
    let isAdmin = false;
    db.getRoles('Admin').then((ids) => {

        ids.forEach(id => {
            if (message.member.roles.cache.has(id)) {
                isAdmin = true;
            }
        });
               
        if (isAdmin) { message.channel.send(helpAdminEmbed); }

    });

    db.closeDatabase();


}