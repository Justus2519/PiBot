const {SlashCommandBuilder} = require('discord.js');
const {fruits, sentence} = require('../../fruits.json');

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName('pie-me')
    .setDescription('Gives you the name of a potentially yummy pie!'),
    async execute(interaction) {
      const i = Math.floor(Math.random() * fruits.length);
      const j = Math.floor(Math.random() * sentence.length);

      const fruit = fruits[i];
      const words = sentence[j];
      let part1 = "";
      let part2="";

      if(words[0].length>0) part1 = words[0] + " ";
      if(words.length>1) part2 = " " + words[1];

      await interaction.reply(`${part1}${fruit} pie${part2}!`);
    },
};