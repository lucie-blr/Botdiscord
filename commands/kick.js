const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('../config.json'),
    fs = require('fs')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        var user = message.author.id
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à kick.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas sanctionner le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send ('Vous ne pouvez pas exclure ce membre.')
        if (!member.kickable) return message.channel.send('Le bot ne peut pas exclure ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.kick(reason)
        //MESSAGE\\
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Kick')
        .setDescription(`${member} a été kick pour ${reason} !`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )
    //LOG\\
    member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
    .setTitle('Kick')
    .setDescription(`Joueur : **${member}**\nModérateur : ** <@${user}> **\nRaison : **${reason}**`)
    .setColor(config.embed.color)
    .setFooter(config.embed.botby, config.embed.logo)
)
    },
    name: 'kick',
    guildOnly: true,
    help: {
        description: 'Exclure un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}