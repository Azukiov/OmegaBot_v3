const { ActivityType } = require("discord.js");
const { version } = require("./../config/config.js")

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        
        client.user.setActivity(`la ${version}`, { type: ActivityType.Watching });1e4
    }
}