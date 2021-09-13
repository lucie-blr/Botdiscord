const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('../config.json'),
    fs = require('fs')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        var user = message.author.id
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unmute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez unmute le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas unmute ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.')
        await member.roles.remove(muteRole)
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('UnMute')
        .setDescription(`${member} a été unmute pour ${reason} !`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )
    member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
    .setTitle('UnMute')
    .setDescription(`Joueur : **${member}**\nModérateur : ** <@${user}> **\nRaison : **${reason}**`)
    .setColor(config.embed.color)
    .setFooter(config.embed.botby, config.embed.logo)
)
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'Unmute un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}