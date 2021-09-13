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
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.embed.color)      
            
            .setDescription(message.content.trim().slice(`${config.prefix}embed`.length))
            .setFooter(config.embed.botby, config.embed.logo)
        )
        
        
    },
    name: 'embed',
    help: {
        description: 'Faire dire quelque chose au bot en embed.',
        syntax: '<message>'
    }
}