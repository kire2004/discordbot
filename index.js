const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
      if (oldMember.voiceChannelID === null) {
        const textChannel = client.channels.find("name", "general");
        textChannel.send('Hello');
    }
})

client.login(token.token);
