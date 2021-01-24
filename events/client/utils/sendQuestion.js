const { MessageEmbed } = require('discord.js');
const Database = require("../../../database/database.js");

module.exports.run = (member) =>{

    const db = new Database();

    db.getNumberQuestions().then((nb) => {
        let random = Math.floor(Math.random() * nb) + 1;

        db.userExist(member.id).then((exist) => {
            if(exist){
                db.getUserNumberTry(member.id).then((nbTry) => {
                    db.updateUserQuestion(member.id, random, nbTry + 1);
                        send(db,member);
                });
            }else{
                db.addUserQuestion(member.displayName, member.id, random, member);
                send(db,member);
            }
        });
    });
    
}

module.exports.newSend = (message) =>{

    const db = new Database();

    db.getNumberQuestions().then((nb) => {
        let random = Math.floor(Math.random() * nb) + 1;

        db.userExist(message.author.id).then((exist) => {
            if(exist){
                db.getUserNumberTry(message.author.id).then((nbTry) => {
                    db.updateUserQuestion(message.author.id, random, nbTry + 1);
                    send(db,message.author);
                });
            }else{
                db.addUserQuestion(message.author.displayName, message.author.id, random);
                send(db,message.author);
            }
        });
    });
    
}

function send(db, member){
    db.getQuestion(member.id).then((question) => {
        let answers = question.Answers.split(',');
        let messageEmbed = `Bienvenue sur le serveur discord de la communauté visionnaire <@${member.id}> ! \nMerci de lire les règles du serveur et de répondre à la question suivante: \n:warning: Merci de répondre par la lettre associé à la réponse !\n\n **${question.Question}**\n`;
        let lettre = 'A';

        answers.forEach(answer => {
            messageEmbed += `${lettre}) ${answer}\n`
            lettre = nextChar(lettre);
        });

        const questionMessage = new MessageEmbed()
            .setTitle('Question de vérification')
            .setColor('RANDOM')
            .setDescription(messageEmbed);
        member.send(questionMessage);

        db.closeDatabase();

    });
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}