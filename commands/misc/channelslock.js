const { MessageEmbed } = require('discord.js');
const { PREFIX } = require("../../config.json");
const Database = require("../../database/database.js");

module.exports.help = {
    name: 'channelslock',
    description: 'Permet de lock tout les salon le serveur.',
    usage: 'on/off',
    args: true,
    aliases: ["chl"],
    admin: true

}

module.exports.run = async (client, message, args) => {
    
    const db = new Database();
    db.getRoles('Default').then((idsRole) => {

        idsRole.forEach(idRole => {

            let defaultR = message.guild.roles.cache.get(idRole);

            db.getChannelsWith('lock').then((idsChannel) => {
                idsChannel.forEach(idChannel => {
                    if (args[0] == 'on') {
                        let chan = client.channels.cache.get(idChannel)
                        chan.updateOverwrite(defaultR, { 'SEND_MESSAGES': false });
                    } else if (args[0] == 'off') {
                        let chan = client.channels.cache.get(idChannel)
                        chan.updateOverwrite(defaultR, { 'SEND_MESSAGES': true });
                    } else {
                        const messageError = new MessageEmbed()
                            .setColor('RED')
                            .setTitle(":x: Commande")
                            .setDescription(`Merci d'utiliser la commande correctement:\n${PREFIX} channelslock {on/off}`);
                        message.channel.send(messageError);
                        return;
                    }
                });
            });

        });

    });

    if (args[0] == 'on') {
        db.getChannelsWith('lock_info').then((idsChannel) => {
            idsChannel.forEach(idChannel => {
                const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔒 Channels verrouillé")
                        .setDescription(`Pour des raisons de sécurité le serveur entier est vérouillé pour une durée indéterminée.`);
                client.channels.cache.get(idChannel).send(messageLock);
            });
        });

        db.getChannelsWith('logs').then((idsChannel) => {
            idsChannel.forEach(idChannel => {
                const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔒 Channels verrouillé")
                        .setDescription(`Les channels du serveurs on été verrouillé, pour les réouvrirs utiliser la commande:\n${PREFIX} channelslock off`);
                client.channels.cache.get(idChannel).send(messageLock);
            });
        });
        return;
    } else if (args[0] == 'off') {
        db.getChannelsWith('lock_info').then((idsChannel) => {
            idsChannel.forEach(idChannel => {
                const messageLock = new MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle("🔓 Channels déverrouillé")
                    .setDescription("Nous vous remercions de votre compréhension et de votre attente !");
                client.channels.cache.get(idChannel).send(messageLock);
            });
        });

        db.getChannelsWith('logs').then((idsChannel) => {
            idsChannel.forEach(idChannel => {
                const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔓 Channels déverrouillé")
                        .setDescription("Les channels du serveurs on été déverrouillé avec succès.");
                client.channels.cache.get(idChannel).send(messageLock);
            });
        });
        return;
    }

}