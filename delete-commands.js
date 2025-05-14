const {REST, Routes} = require('discord.js');
const {clientId, guildId, token} = require('./config.json');
const rest = new REST().setToken(token);

commands_to_delete = []; //must be strings of numbers

for (const ids of commands_to_delete){
  rest.delete(Routes.applicationCommand(clientId, ids))
  .then(() => console.log('Successfully deleted command'))
  .catch(console.error);
}
