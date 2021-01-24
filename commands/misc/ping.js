const { MessageEmbed } = require('discord.js');
const cpuStat = require("cpu-stat");
const os = require('os')

module.exports.help = {
    name: 'ping',
    aliases: ["p"],
    description: 'Permet d\'obtenir des informations sur le bot.',
    botIdArg: true,
    usage: 'Pokemon',
    args: true,
    admin: true
}

module.exports.run = (client, message, args) => {
    cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const messagePing = new MessageEmbed()
            .setColor('BLUE')
            .setTitle("📶 Ping")
            .addFields(
                { name: 'Latence serveur :', value: `${new Date() - message.createdAt}ms`, inline: false },
                { name: 'Latence API :', value: `${Math.round(client.ws.ping)}ms`, inline: false },
                { name: 'En ligne depuis :', value: `${msToTime(client.uptime)}`, inline: false },
                { name: 'RAM', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline: false },
                { name: 'CPU :', value: `${percent.toFixed(2)}%`, inline: false },
            )
            ;
        message.channel.send(messagePing);
    });
}

function msToTime(ms) {
    days = Math.floor(ms / 86400000); // 24*60*60*1000
    daysms = ms % 86400000; // 24*60*60*1000
    hours = Math.floor(daysms / 3600000); // 60*60*1000
    hoursms = ms % 3600000; // 60*60*1000
    minutes = Math.floor(hoursms / 60000); // 60*1000
    minutesms = ms % 60000; // 60*1000
    sec = Math.floor(minutesms / 1000);

    let str = "";
    if (days) str = str + days + "d";
    if (hours) str = str + hours + "h";
    if (minutes) str = str + minutes + "m";
    if (sec) str = str + sec + "s";

    return str;
}