const {Events} = require('discord.js');
const {clientId} = require('../config.json');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message){
    let msg = message.content;
    msg = msg.toLowerCase();
    mention = /^((.*\W+)?|\W*)[Pp]+[Ii]+([Bb]+[Oo]+[Tt]+)?(\W+.*|\W*)$/
    if( msg.search(mention) != -1 && message.author.id != clientId){
      await message.channel.send("Did someone mention pi\?\?\!\!");
    }

  },
};