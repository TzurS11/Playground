const { SlashCommandBuilder } = require("@discordjs/builders");
const { DiscordTogether } = require('discord-together');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("activity")
    .setDMPermission(false)
    .setDescription("Starts an activity in a voice channel")
    .addChannelOption(option => option
      .setName('channel')
      .setDescription('Select a voice channel')
      .addChannelTypes(2)
      .setRequired(true))
    .addStringOption(option =>
      option.setName('activity')
        .setDescription('Choose an activity')
        .setRequired(true)
        .addChoices(
          {
            name: 'Youtube',
            value: 'youtube'
          },
          {
            name: 'Poker',
            value: 'poker'
          },
          {
            name: 'Chess',
            value: 'chess'
          },
          {
            name: 'Checkers in the Park',
            value: 'checkers'
          },
          {
            name: 'Betrayal',
            value: 'betrayal'
          },
          {
            name: 'Fishing',
            value: 'fishing'
          },
          {
            name: 'Letter Tile',
            value: 'lettertile'
          },
          {
            name: 'Words Snack',
            value: 'wordsnack'
          },
          {
            name: 'Doodle Crew',
            value: 'doodlecrew'
          },
          {
            name: 'SpellCast',
            value: 'spellcast'
          },
          {
            name: 'Awkword',
            value: 'awkword'
          },
          {
            name: 'Puttparty',
            value: 'puttparty'
          },
          {
            name: 'Sketchheads',
            value: 'sketchheads'
          },
          {
            name: 'Ocho',
            value: 'ocho'
          }
        )),
  execute(interaction, client) {
    const activityType = interaction.options.getString('activity');

    if (!interaction.guild.me.permissions.has("CREATE_INSTANT_INVITE")) {
      return interaction.reply({ content: "I can't create invites so I can't start an activity.\nIf you believe it's a mistake contact the admins.", ephemeral: true })
    }
    if (!interaction.member.permissions.has("CREATE_INSTANT_INVITE")) {
      return interaction.reply({ content: "You can't create invites so you can't start an activity.\nIf you believe it's a mistake contact the admins.", ephemeral: true })
    }
    const selectedChannel = interaction.options.getChannel('channel');
    client.discordTogether = new DiscordTogether(client);
    client.discordTogether.createTogetherCode(selectedChannel.id, activityType).then(async invite => {
      const inviteRow = new MessageActionRow()
      inviteRow.addComponents(
        new MessageButton()
          .setLabel('Join activity')
          .setStyle('LINK')
          .setURL(invite.code)
      )
      inviteRow.addComponents(
        new MessageButton()
          .setCustomId('inviteBtn')
					.setLabel('Add to Server')
					.setStyle('PRIMARY')
      )
      //this used to be the old look of the bot but for now i changed it
      // const SuccessEmbed = new MessageEmbed()
      //   .setTitle(`Activity started`)
      //   .setDescription(`||**${invite.code}**||`)
      //   .addFields(
      //     {
      //       name: "Channel",
      //       value: `<#${selectedChannel.id}>`,
      //       inline: true
      //     },
      //     {
      //       name: "Activity",
      //       value: activityType.charAt(0).toUpperCase() + activityType.slice(1),
      //       inline: true
      //     },
      //     // {
      //     //   name: "Server Boosts",
      //     //   value: "None",
      //     //   inline: false
      //     // }
      //   )
      //   // .addField('\u200B',`[invite](${invite.code})`)
      //   .setColor("#65ff4a")
      const messageContent = `**${activityType.charAt(0).toUpperCase() + activityType.slice(1)} activity started in <#${selectedChannel.id}>⚔️**`
      interaction.reply({ content:messageContent,components:[inviteRow], ephemeral: true })
    })
  }
};