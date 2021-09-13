const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
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
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        //MESSAGE\\
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('TempBan')
        .setDescription(`${member} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} pour ${reason} !`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )
    //LOG\\
    member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
    .setTitle('TempBan')
    .setDescription(`Joueur : **${member}**\nModérateur : ** <@${user}> **\nDurée : **${humanizeDuration(duration, {language: 'fr'})}**\nRaison : **${reason}**`)
    .setColor(config.embed.color)
    .setFooter(config.embed.botby, config.embed.logo)
)
        
        setTimeout(() => {
            message.guild.members.unban(member)
            member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
                .setDescription(`${member} a été débanni du tempban.`)
                .setColor(config.embed.color)
                .setFooter(config.embed.botby, config.embed.logo)
                )
        }, duration)
    },
    name: 'tempban',
    guildOnly: true,
    help: {
        description: 'Bannir temporairement un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}
 