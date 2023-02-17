const { ActivityType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { maintenance, version, color } = require("./../config/config.js")

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        client.user.setActivity(`la ${version}`, { type: ActivityType.Watching }); 1e4

        const dnd = "<:dnd:1059975813061169262>"
        const online = "<:online:1059975815489667083>"
        const channelId = "1066892870524608542"

        const verif = new EmbedBuilder()
            .setTitle("Vérifiacation anti-raid")
            .setDescription(`Le bot est en dev ${version}\n Si la vérification ne fonctionne pas, merci de me ping`)
            .addFields(
                { name: "Développeur du bot", value: `<@704743834730627163>` },
                { name: "Etat de la Vérification", value: `${maintenance ? `${dnd} Inactif` : `${online} Actif`}` },
            )
            .setColor(color)
            .setTimestamp()
            .setFooter({ text: `${client.user.tag}`, iconURL: client.user.displayAvatarURL({ size: 1024 }) })
        const button = new ButtonBuilder()
            .setLabel("Click to verify")
            .setStyle(ButtonStyle.Danger)
            .setCustomId("verif")
            .setDisabled(maintenance)
        const actionRow = new ActionRowBuilder()
            .addComponents(button)


        client.channels.cache.get(channelId).messages.fetch().then(messages => {
            if (messages.size >= 1) {
                client.channels.cache.get(channelId).bulkDelete(messages)
                client.channels.cache.get(channelId).send({ embeds: [verif], components: [actionRow] })
            } else {
                client.channels.cache.get(channelId).send({ embeds: [verif], components: [actionRow] })
            }
        })
    }
}