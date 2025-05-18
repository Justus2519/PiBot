const {SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('fart')
    .setDescription('farts'),
    async execute(interaction) {
      await interaction.reply({files: ["./assets/9ufag3.jpg"]});
    }
};