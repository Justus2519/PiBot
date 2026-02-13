const {Events} = require('discord.js');
const {def, christmas, easter, halloween, valentines, birthday} = require(
  '../names.json'
);
const {guildId, channelId, quinnUserId} = require('../config.json');
const cron = require('cron');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute (client) {
    client.user.setActivity('Pi', {type: 1});
    console.log(`Ready! Logged in as ${client.user.tag}`);
    const guild = client.guilds.cache.get(`${guildId}`);
    const channel = guild.channels.cache.get(`${channelId}`);

    let holidayCount = 0;
    let regularCount = 0;
    let isHoliday = false;
    let userQ = await guild.members.fetch(quinnUserId);

    //======================================================      PI TIME
    let piMessage = new cron.CronJob('06 14 20 * * *', ()=>{
      channel.send('Pi time.');
      if(!isHoliday){
        userQ.setNickname(`${def[regularCount]}`);
        regularCount++;
      }
      if(regularCount == def.length) regularCount = 0;
    });
    piMessage.start();
    function holidayJob(holiday){
      return ()=>{
        userQ.setNickname(`${holiday[holidayCount]}`);
        isHoliday = true;
        holidayCount++;
        if(holidayCount == holiday.length){
          holidayCount = 0;
          isHoliday = false;
        }
        console.log("attempted to change nickname");
      }
    }

    let bday = new cron.CronJob('00 14 20 16 8 *', ()=>{
      userQ.setNickname(`${birthday}`);
      isHoliday = false;
      holidayCount = 0;
    });
    let xmas = new cron.CronJob('01 14 20 6-25 12 *', holidayJob(christmas));
    let hween = new cron.CronJob('02 14 20 12-31 10 *', holidayJob(halloween));
    let vday = new cron.CronJob('03 14 20 8-14 2 *', holidayJob(valentines));
    let eggDay = new cron.CronJob('04 14 20 1,2 4 *', holidayJob(easter));
    bday.start();
    xmas.start();
    hween.start();
    vday.start();
    eggDay.start();
  },
};