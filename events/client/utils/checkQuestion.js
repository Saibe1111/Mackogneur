const Database = require("../../../database/database.js");

module.exports.run = (message, client) => {

    const db = new Database();

    let Mid = message.author.id;

    Verif.list.forEach(element => {
        let memberVerif = message.guild.members.cache.get(element);
        
        db.getRoles('Default').then((idsRole) => {
            idsRole.forEach(idRole => {
                memberVerif.roles.add(memberVerif.guild.roles.cache.get(idRole));
            });
        });

    });

    
    if (message.author.bot) return;

    db.userExist(Mid).then((exist) => {
        if (!exist || (message.content == '')) return;
    });
    

    db.getQuestion(Mid).then((question) => {
        let answers = question.Answers.split(',');
        let lettre = 'A';

        answers.forEach(answer => {
            if (answer === question.GoodAnswer){
                console.log(lettre);
            }
            lettre = nextChar(lettre);
        });

    });


    //Verif.list.push("721311225924812830");

    

    /*
    let memberVerif = Verification.list.get(Mid).getMember();

    if (message.content.toUpperCase() == Verification.list.get(Mid).getAnswer()) {
        messageWelcome.message(client, memberVerif);
        messageLogs.message(client, memberVerif);
        for(r in DEFAULT){
            memberVerif.roles.add(memberVerif.guild.roles.cache.get(DEFAULT[r].ID));
        }
        memberVerif.roles.remove(memberVerif.guild.roles.cache.get(JOIN.ID));
        message.reply('Bonne réponse ! Tu viens d\'obtenir ton rôle sur le serveur !');
        Verification.list.delete(Mid);
    } else {
        message.reply('Mauvaise réponse ! Consultez à nouveau les règles et répondez à cette question !');
        Verification.list.delete(Mid);
        sendQuestion(memberVerif,numberVerif);
    }*/
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

class Verif{
    static list = [];
} 