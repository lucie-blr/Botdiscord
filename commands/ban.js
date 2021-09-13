const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('../config.json'),
    fs = require('fs')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        var user = message.author.id
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas sanctionner le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send ('Vous ne pouvez pas bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        //MESSAGE\\
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.embed.color)      
            .setTitle('Ban')
            .setDescription(`${member} a été banni pour ${reason} !`)
            .setFooter(config.embed.botby, config.embed.logo)
        )
        //LOG\\
        member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
        .setTitle('Ban')
        .setDescription(`Joueur : **${member}**\nModérateur : ** <@${user}> **\nRaison : **${reason}*`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )
    },
    name: 'ban',
    guildOnly: true,
    help: {
        description: 'Bannir un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}