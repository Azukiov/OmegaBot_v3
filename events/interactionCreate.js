const { InteractionType } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        let client = interaction.client;

        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;

            readdirSync('./commands').forEach(file => {
                const command = require(`../commands/${file}`);

                if (interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
                    command.run(client, interaction)
                }
            })
        }
    }
}