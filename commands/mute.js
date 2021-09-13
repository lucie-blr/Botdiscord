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
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
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
        .setTitle('Mute')
        .setDescription(`${member} a été mute pour ${reason} !`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )
        //LOG\\
        member.guild.channels.cache.get(config.greeting.log).send( new Discord.MessageEmbed()
        .setTitle('Mute')
        .setDescription(`Joueur : **${member}**\nModérateur : ** <@${user}> **\nRaison : **${reason}**`)
        .setColor(config.embed.color)
        .setFooter(config.embed.botby, config.embed.logo)
    )

    },
    name: 'mute',
    guildOnly: true,
    help: {
        description: 'Mute un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}
 