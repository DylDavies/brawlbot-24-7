const Discord = require('discord.js');

const client = new Discord.Client();

const token = 'NDA3MTc1NTI5NjcwNzcwNjg5.DU9rTg.wDgTCL5oCu00g0Y20-FdXP_lgQw';

const prefix = "!";

client.on('message', message => {
  
})

client.on("ready", function() {
    console.log(`${client.user.username} is online!`);
    client.user.setGame("I was made by TheeSniper95");
  })

client.on('guildMemberAdd', member => {

  var role1 = member.guild.roles.find('name', 'No team');

  member.addRole(role1);

  member.guild.channels.get('405065054262919171').sendMessage('Welcome <@' + member.user.id + '> to Brawlympics , enjoy your stay!');
});

client.on('guildMemberRemove', member => {

  member.guild.channels.get('405065054262919171').sendMessage('Bye Bye **' + member.user.username + '** :wave:');
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
   
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
   
    if(cmd === `${prefix}userinfo`){
   
      let botembed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#FF0000")
      .addField("Full username", `${message.author.tag}`)
      .addField("Created on", `${message.author.createdAt} ${message.author.createdTimestamp}`)
      .addField("Discord ID", `${message.author.id}`)
      .addField("Game")
      .addField("Profile Picture", `${message.author.displayAvatarURL}`);
   
      return message.channel.send(botembed);
   
    }
    if(cmd === `${prefix}pfp`){
   
      let botembed = new Discord.RichEmbed()
      .addField("Your Profile Picture", `${message.author.displayAvatarURL}`);
   
      return message.channel.send(botembed);
      }
   
      if(cmd === `${prefix}mute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permissions to manage messages!");
   
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.sendMessage("No user specified")
   
        if(toMute.id === message.author.id) return message.channel.sendMessage("This person is yourself, if you hate yourself, cheer up, you're not a robot. :sob:")
        if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("DON'T DISRESPECT YOUR SUPERIORS! (The person you tried to mute has more power!)")
   
        let role = message.guild.roles.find(r => r.name === "Muted");
        if(!role) {
            try {
              role = await message.guild.createRole({
                  name: "Muted",
                  color: "#13#153",
                  permissions: []
              });
   
              message.guild.channels.forEach(async (channel, id) => {
                  await channel.overwritePermissions(role, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false
                  });
              });
          } catch(e) {
              console.log(e.stack);
          }
        }
   
        if(toMute.roles.has(role.id)) return message.channel.sendMessage("Error! This user is already muted! He can't talk.");
   
        await toMute.addRole(role);
        message.channel.sendMessage("User has been muted! The day that he/she was muted was a very rainy day.");
   
        }
   
        if(cmd === `${prefix}unmute`) {
          if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permissions to manage messages! You are but a slave to this society!");
   
          let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
          if(!toMute) return message.channel.sendMessage("No user specified")
   
          if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("It's a nice thing to do, help superiors. But an even HIGHER role decided he should be muted.")
   
          let role = message.guild.roles.find(r => r.name === "Muted");
   
          if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Error! This user is not muted! Can't do anything about that.");
   
          await toMute.removeRole(role);
          message.channel.sendMessage("User has been unmuted! A very happy moment for all!");
          }
  });

client.login(process.env.BOT_TOKEN);
