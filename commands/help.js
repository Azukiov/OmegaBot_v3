const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('🇺🇸 Show help | 🇫🇷 Affiche l\'aide'),

    run: async (client, interaction) => {
        await interaction.reply({
            content: '🇺🇸 Help is coming soon | 🇫🇷 L\'aide arrive bientôt',
        });
    }
}