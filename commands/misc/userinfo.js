const {MessageEmbed} = require('discord.js');
const moment = require('moment');

module.exports.help = {
    name: 'userinfo',
    aliases:["useri","ui"],
    description: 'Pour avoir des informations sur un utilisateur.',
    botIdArg: false,
    usage: '',
    args: false,
    admin: false
}

module.exports.run = (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const status = {
        online: "En ligne",
        idle: "Inactif",
        dnd: "Ne pas déranger",
        offline: "Hors-Ligne"
    }

    let today = moment(new Date());

    const messageUserInfo = new MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(member.displayColor)
    .setTitle(`__${member.displayName}__`)
    .addFields(
        { name: 'A rejoint le :', value : `${moment(member.joinedAt).format('DD/MM/YY')}`, inline  : false},
        { name: 'A rejoint il y a :', value : `${today.diff(member.joinedAt, 'days')} Jours`, inline  : false},
        { name: 'Compte créé le :', value : `${moment(member.user.createdAt).format('DD/MM/YY')}`, inline  : false},
        { name : 'Tag :', value: `${member.user.tag}`, inline  : false},
        { name : 'Statut :', value: `${status[member.user.presence.status]}`, inline  : false}
    )
    .setFooter(`Information à propos de ${member.user.username}`);
    
    message.channel.send(messageUserInfo);
}