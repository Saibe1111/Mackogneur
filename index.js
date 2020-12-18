const { Client, Collection } = require('discord.js');
const { TOKEN } = require("./config.json");
const { readdirSync } = require('fs');

const client = new Client();
client.login(TOKEN);

client.commands = new Collection();

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`${getFileName.help.name} command loaded`)
        }
    });
}

const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split('.')[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`${evtName} event loaded`);
        }
    });
}

loadCommands();
loadEvents();

function intervalFunc() {
    client.user.setActivity(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) + ' Visionnaires', { type: 'WATCHING' });
}
setInterval(intervalFunc, 60000);