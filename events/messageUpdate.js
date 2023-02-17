const { serverIdMaskfr, channelMessageEdited } = require('../config/logs-maskfr.js')
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { color } = require('../config/config.js')

module.exports = {
    name: 'messageUpdate',

    async execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return;
        if (oldMessage.channel.type === 'DM') return;

        if (oldMessage.guild.id !== serverIdMaskfr) return;
        if (oldMessage.content === newMessage.content) return;

        let channel = oldMessage.client.channels.cache.get(channelMessageEdited);

        const embed = new EmbedBuilder()
            .setTitle(`Message édité dans ${oldMessage.channel}`)
            .addFields(
                { name: `Auteur:`, value: newMessage.author },
                { name: `Ancien message:`, value: oldMessage.content },
                { name: `Nouveau message:`, value: newMessage.content },
                )
            .setColor(color)
            .setTimestamp()
            .setFooter({ text: `ID: ${newMessage.id}` })
        channel.send({ embeds: [embed], components: [button] })

        const button = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel('Delete Message')
            .setCustomId('deleteMessage')
            .setDisabled(false)

        client.on('interactionCreate', async (interaction, newMessage) => {
            if (!interaction.isButton()) return;
            if (interaction.customId === 'deleteMessage') {
                newMessage.delete();
            }
        });
    }
}