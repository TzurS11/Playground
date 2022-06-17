const fs = require('fs')
const { Client, Intents, Collection, Permissions, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = new Client({ intents: 32269, partials: ['CHANNEL'] });
require('dotenv').config()



client.aliases = new Collection();
client.interactions = new Collection();

fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'inviteBtn') {
    try {
      const inviteRow = new MessageActionRow()
      inviteRow.addComponents(
        new MessageButton()
          .setLabel('Click here to invite me to your server!')
          .setStyle('LINK')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=985254683792797736&permissions=1&scope=applications.commands%20bot")
      )
     interaction.reply({content:"**Go to my profile and press <:add1:985489841582129194><:add2:985490952867176459><:add3:985489868010438696> or press on the button below!**",components:[inviteRow],ephemeral:true})
    } catch (e) { }
  }
});


client.login(process.env.DISCORD_TOKEN)
