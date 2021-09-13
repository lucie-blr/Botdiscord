const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('../config.json'),
    fs = require('fs')
 
module.exports = {
    run: (message, args) => {
        var user = message.author.id
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length))
    },
    name: 'say',
    guildOnly: true,
    help: {
        description: 'Faire dire quelque chose au bot.',
        syntax: '<message>'
    }
}