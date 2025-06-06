const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('foot')
    .setDescription('You want foot\?'),
    async execute(interaction) {
      if(interaction){}
    }
};