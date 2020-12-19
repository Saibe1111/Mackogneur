const Database = require("../../database/database.js");
const { PREFIX } = require("../../config.json");
const { MessageEmbed } = require('discord.js');
const Ping = require('./utils/ping.js')


module.exports = (client, message) => {

    Ping.run(message, client);
    
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    
    const db = new Database();
    let isAdmin = false;
    db.getRoles('Admin').then((ids) => {

        ids.forEach(id => {
            if (message.member.roles.cache.has(id)) {
                isAdmin = true;
            }
        });

        if(adminCommands(command, message, isAdmin)){
            return;
        }

        channelCheck(message, isAdmin, db).then((cmd) => {
            if(cmd){
                return;
            }

            if (command.help.args && !args.length) {
                errorMessage(command, message);
                return;
            }
        
            if (command.help.botIdArg && !(args[0] === `<@!${client.user.id}>` || args[0] === `<@${client.user.id}>` || args[0].toLowerCase() === client.user.username.toLowerCase())) {
                return;
            }
        
            command.run(client, message, args);

        });
       
        

    });

    db.closeDatabase();

}

const errorMessage = (command, message) => {
    const messageError = new MessageEmbed()
        .setColor('RED')
        .setTitle(":x: Commande")
        .setDescription(`**${message.member.displayName}**,\nMerci d'utiliser la commande correctement:\n**${PREFIX} ${command.help.name} {${command.help.usage}}**`);
    message.channel.send(messageError).then( msg =>{
        msg.delete({ timeout: 30000 }); 
    });
    message.delete();
}


const adminCommands = (command, message, isAdmin) => {
    if (!(message.member.hasPermission('ADMINISTRATOR') || isAdmin) && command.help.admin) {
        const messagePing = new MessageEmbed()
            .setColor('RED')
            .setTitle(":x: Commande")
            .setDescription(`**${message.member.displayName}**,\nVous n'avez pas accès à cette commande.`);
        message.channel.send(messagePing).then( msg => {
            msg.delete({ timeout: 30000 }); 
        });
        message.delete();
        return true;
    }
    return false;
}

const channelCheck = (message, isAdmin, db) => {
    return new Promise((resolve, reject) => {
        let cmd = false;
        if (!(message.member.hasPermission('ADMINISTRATOR') || isAdmin)) {
            db.getChannelsWith('commands').then((ids) => {
                ids.forEach(id => {
                    if (message.channel.id === id) {
                        cmd = true;
                    }
                });

                if(!cmd){
                    message.delete();
                }
                resolve(!cmd);
            });
        }else{
            resolve(cmd);
        }
    });
}