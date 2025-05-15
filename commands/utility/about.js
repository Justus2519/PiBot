const {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require('discord.js');


module.exports = {
  cooldown: 2,
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Stuff about pi and piBot'),
    async execute(interaction){
      const pi1 = new ButtonBuilder()
        .setLabel('More about pi')
        .setURL('https://en.wikipedia.org/wiki/Pi#:~:text=The%20number%20%CF%80%20(%2Fpa%C9%AA,s%20circumference%20to%20its%20diameter.')
        .setStyle(ButtonStyle.Link);
      const pidig = new ButtonBuilder()
        .setLabel('Million digits of Pi')
        .setURL('https://www.piday.org/million/')
        .setStyle(ButtonStyle.Link);
      const row = new ActionRowBuilder()
        .addComponents(pi1, pidig);
      
      await interaction.reply({
        content: 'I\'m PiBot bro. 3 to the dot to the 141',
        components: [row],
      });
    },
}