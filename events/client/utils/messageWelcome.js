const Canvas = require('canvas');
const {MessageAttachment} = require('discord.js');
const Database = require("../../../database/database.js");

module.exports = {
    message: async function (client, message) {

        const db = new Database();


        Canvas.registerFont('./assets/font/LondrinaShadow-Regular.ttf', { family: 'Londrina' })
        Canvas.registerFont('./assets/font/LuckiestGuy-Regular.ttf', { family: 'Luck' })
        //Génération de l'image !
        const canvas = Canvas.createCanvas(1024, 500);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./assets/image/wallpaper.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '68.5pt "Londrina"'
        ctx.fillStyle = '#000000';
        ctx.fillText(`Bienvenue :`, 430, 170);

        ctx.font = '33.7pt "Luck"'
        ctx.textAlign = "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(`${message.author.username}`, 620, 250);

        ctx.beginPath();
        ctx.arc(230, 250, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 130, 150, 200, 200);

        const attachment  = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        let generalID;
        let announcementsID;
        let rulesID;
        let infosID;

        db.getChannelsWith('general').then((generalIDs) => {
            generalIDs.forEach(generalID2 => {
                generalID = generalID2;
            });
            db.getChannelsWith('announcements').then((announcementsIDs) => {
                announcementsIDs.forEach(announcementsID2 => {
                    announcementsID = announcementsID2;
                });
                db.getChannelsWith('rules').then((rulesIDs) => {
                    rulesIDs.forEach(rulesID2 => {
                        rulesID = rulesID2;
                    });
                    db.getChannelsWith('infos').then((infosIDs) => {
                        infosIDs.forEach(infosID2 => {
                            infosID = infosID2;
                        });

                        let welcomeMessage = `Bienvenue à ${message.author}. Si tu aimes Bigflo et Oli, tu es au bon endroit ! \n■  Tant que tu es là, penses à bien relire les <#${rulesID}> et regarde dans <#${announcementsID}> pour voir les infos du serveur.\n■ Reste informé sur l’actualité des frères dans <#${infosID}> et viens discuter dans <#${generalID}> !`
                        db.getChannelsWith('welcome').then((channelWelcomeIDs) => {
                            channelWelcomeIDs.forEach(channelWelcomeID => {
                                client.channels.cache.get(channelWelcomeID).send(welcomeMessage,attachment);
                            });
                        });

                    });
                });
            });
        });
        
      }

    
}