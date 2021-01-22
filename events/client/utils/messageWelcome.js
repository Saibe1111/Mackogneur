const Canvas = require('canvas');
const {MessageAttachment, MessageEmbed} = require('discord.js');

module.exports = {
    message: async function (client, member) {
        Canvas.registerFont('./assets/font/LondrinaShadow-Regular.ttf', { family: 'Londrina' })
        Canvas.registerFont('./assets/font/LuckiestGuy-Regular.ttf', { family: 'Luck' })
        //Génération de l'image !
        const canvas = Canvas.createCanvas(1024, 500);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/img/wallpaper.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '68.5pt "Londrina"'
        ctx.fillStyle = '#000000';
        ctx.fillText(`Bienvenue :`, 430, 170);

        ctx.font = '33.7pt "Luck"'
        ctx.textAlign = "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(`${member.displayName}`, 620, 250);

        ctx.beginPath();
        ctx.arc(230, 250, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 130, 150, 200, 200);

        const attachment  = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');


        let generalID;
        let announcementsID;
        let rulesID;
        let infosID;
        for (i in jsonC.CHANNELS) {
            //channels permissions
            for (j in jsonC.CHANNELS[i].PERMISSION) {
    
                if (jsonC.CHANNELS[i].PERMISSION[j] == 'general') {
                    generalID = jsonC.CHANNELS[i].ID;
                }else if(jsonC.CHANNELS[i].PERMISSION[j] == 'announcements') {
                    announcementsID = jsonC.CHANNELS[i].ID;
                }else if(jsonC.CHANNELS[i].PERMISSION[j] == 'infos') {
                    infosID = jsonC.CHANNELS[i].ID;
                }else if(jsonC.CHANNELS[i].PERMISSION[j] == 'rules') {
                    rulesID = jsonC.CHANNELS[i].ID;
                }

            }
        }

        db.getChannelsWith('join_logs').then((generalIDs) => {
            idsChannel.forEach(generalID => {
                
            });
        });
        
        //Envoie image + message
        let welcomeMessage = `Bienvenue à ${member}. Si tu aimes Bigflo et Oli, tu es au bon endroit ! \n■  Tant que tu es là, penses à bien relire les <#${rulesID}> et regarde dans <#${announcementsID}> pour voir les infos du serveur.\n■ Reste informé sur l’actualité des frères dans <#${infosID}> et viens discuter dans <#${generalID}> !`
        const welcomeMessageEmbed = new MessageEmbed()
            .setTitle(`Bienvenue à ${member.displayName} !`)
            .setColor('RANDOM')
            .attachFiles()
            .setDescription(welcomeMessage)
            .setImage('attachment://welcome-image.png');

        
        for (i in jsonC.CHANNELS) {
            //channels permissions
            for (j in jsonC.CHANNELS[i].PERMISSION) {
    
                if (jsonC.CHANNELS[i].PERMISSION[j] == 'welcome_message') {
                    client.channels.cache.get(jsonC.CHANNELS[i].ID).send(welcomeMessage,attachment);
                }
            }
        }

      }

    
}