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
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        var user = message.author.id
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mute le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        //MESSAGE\\
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('TempMute')
        .setDescription(`${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} pour ${reason} !`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )
    member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
    .setTitle('TempMute')
    .setDescription(`Joueur : **${member}**\nModérateur : ** <@${user}> **\nDurée : **${humanizeDuration(duration, {language: 'fr'})}**\nRaison : **${reason}**`)
    .setColor(config.embed.color)
    .setFooter(config.embed.botby, config.embed.logo)
)
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            
            member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
                .setDescription(`${member} a été unmute du tempmute.`)
                .setColor(config.embed.color)
                .setFooter('Bot by LoliChann', 'https://i.imgur.com/IqalyJK.png'))
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true,
    help: {
        description: 'Mute temporairement un membre du serveur.',
        syntax: '<@membre> <temps> [raison]'
    }
}