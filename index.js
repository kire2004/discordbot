const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const fs = require('fs');


const broadcast = client.createVoiceBroadcast();

client.on('ready', () => {
  console.log('I am ready!');
  const voiceChannel = client.channels.find("name", "General");

  voiceChannel.join()
    .then(connection => {
      const stream = ytdl('https://www.youtube.com/watch?v=XsZKrctSDaw', { filter : 'audioonly' });
      broadcast.playStream(stream);
      const dispatcher = connection.playBroadcast(broadcast);
    })
    .catch(console.error);
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
      if (oldMember.voiceChannelID === null) {
        const textChannel = client.channels.find("name", "general");
        textChannel.send('Hello ' + newMember.displayName);
    }
})

client.login(token.token);


//stream.pipe(fs.createWriteStream('test.mp3'));
