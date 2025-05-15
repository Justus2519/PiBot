const {Events} = require('discord.js');
const {guildId, channelId} = require('../config.json');
const cron = require('cron');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity('Pi', {type: 1});
    console.log(`Ready! Logged in as ${client.user.tag}`);

    //======================================================      PI TIME
    let piMessage = new cron.CronJob('00 14 15 * * *', ()=>{
      const guild = client.guilds.cache.get(`${guildId}`);
      const channel = guild.channels.cache.get(`${channelId}`);
      channel.send('Pi time.')
    });
    piMessage.start();
  },
};