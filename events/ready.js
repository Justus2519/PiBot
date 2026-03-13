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

    //===================================== CRON JOBS
    let holidayCount = 0;
    let regularCount = 25; //Some arbitrary starting point
    let isHoliday = false;
    let userQ = await guild.members.fetch(quinnUserId);

    function holidayJob(holiday){
      return ()=>{
        userQ.setNickname(`${holiday[holidayCount]}`);
        isHoliday = true;
        holidayCount++;
        if(holidayCount == holiday.length){
          holidayCount = 0;
          isHoliday = false;
        }
      }
    }

    let bday = new cron.CronJob('00 11 09 16 8 *', ()=>{
      userQ.setNickname(`${birthday}`);
      isHoliday = false;
      holidayCount = 0;
    },
     timeZone='America/Toronto');
    let xmas = new cron.CronJob('01 11 09 6-25 12 *', holidayJob(christmas), timeZone='America/Toronto');
    let hween = new cron.CronJob('02 11 09 12-31 10 *', holidayJob(halloween), timeZone='America/Toronto');
    let vday = new cron.CronJob('03 11 09 8-14 2 *', holidayJob(valentines), timeZone='America/Toronto');
    let eggDay = new cron.CronJob('04 11 09 1,2 4 *', holidayJob(easter), timeZone='America/Toronto');
    let normalChange = new cron.CronJob('06 11 09 * * *', ()=>{
      if(!isHoliday){
        userQ.setNickname(`${def[regularCount]}`);
        regularCount++;
      }
      if(regularCount == def.length) regularCount = 0;
    }, 
    timeZone='America/Toronto');
    let piMessage = new cron.CronJob('06 14 15* * *', ()=>{
      channel.send('Pi time.');
    }, 
    timeZone='America/Toronto');

    piMessage.start();
    bday.start();
    xmas.start();
    hween.start();
    vday.start();
    eggDay.start();
    normalChange.start();
  },
};