const Database = require("../../../database/database.js");
const {MessageEmbed} = require('discord.js');
const messageWelcome = require('./messageWelcome.js');
const sendQuestion = require('./sendQuestion.js');
const moment = require('moment');

module.exports.run = (message, client) => {

    const db = new Database();

    let Mid = message.author.id;

    if(message.channel.type !== "dm"){

        Verif.list.forEach(element => {
            let memberVerif = message.guild.members.cache.get(element);

            db.getRoles('Default').then((idsRole) => {
                idsRole.forEach(idRole => {
                    memberVerif.roles.add(memberVerif.guild.roles.cache.get(idRole));
                });
            });

            db.getRoles('Join').then((idsRolesRemove) => {
                idsRolesRemove.forEach(idsRoleRemove => {
                    memberVerif.roles.remove(memberVerif.guild.roles.cache.get(idsRoleRemove));
                });
            });

            db.removeUserQuestion(element);

        });
        
        Verif.list = [];
    }

    if (message.author.bot) return;

    db.userExist(Mid).then((exist) => {
        if (!exist){
            return;
        }

        db.getQuestion(Mid).then((question) => {
            let answers = question.Answers.split(',');
            let lettre = 'A';

            answers.forEach(answer => {
                if (answer === question.GoodAnswer){
                    if(lettre === message.content.toUpperCase()){
                        Verif.list.push(message.author.id);
                        db.getChannelsWith('join_logs').then((idsChannel) => {
                            message.reply('Bonne réponse ! Tu viens d\'obtenir ton rôle sur le serveur !');
                            idsChannel.forEach(idChannel => {
                                logMessage(client, message, idChannel,db);
                                messageWelcome.message(client,message);
                            });
                        });
                    }else if (message.content !== ""){
                        message.reply('Mauvaise réponse ! Consultez à nouveau les règles et répondez à cette question !');
                        sendQuestion.newSend(message);
                    }
                }
                lettre = nextChar(lettre);
            });

        });

    });

}

function logMessage(client, message, idChannel, db){
    let nbr = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    db.getUserJoinDate(message.author.id).then((joinDate) => {
        db.getUserNumberTry(message.author.id).then((nbTry) => {
            const messageJoin = new MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
                .setColor('GREEN')
                .setFooter(`ID: ${message.author.id}`)
                .addFields(
                    { name: 'A rejoint le :', value: `${joinDate}`, inline: true },
                    { name: 'A validé le :', value: `${moment(new Date()).format('DD/MM/YY HH:mm')}`, inline: true},
                    { name: 'A validé en :', value: `${nbTry} essai(s)`, inline: true}
                    
                )
                .setDescription(`\nNous sommes maintenant : **${nbr}**`);
            client.channels.cache.get(idChannel).send(messageJoin);
        });
    });
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

class Verif{
    static list = [];
}
