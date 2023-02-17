const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        
        client.user.setActivity('la v2', { type: ActivityType.Watching });1e4
    }
}