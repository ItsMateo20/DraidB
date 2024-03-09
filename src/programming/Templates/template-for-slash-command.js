const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('desc')
        .addUserOption(option => option.setName('target').setDescription('The user')),
    async execute(interaction, inventory, prefix) {
        const target = interaction.options.getUser('target');
        if (target) {
            await interaction.reply({});
        } else if (!target) {
            await interaction.reply({});
        }
    },
};