const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: (message, args, client) => {
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send('Cette commande n\'existe pas.')
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`**${command.name}**`)
            .setColor(config.embed.color)
            .setDescription(`${command.help.description}\n\nSyntaxe : \`${config.prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\`\n\n[] = Non obligatoire\n<> = Obligatoire`)
            .setFooter(config.embed.botby, config.embed.logo)
            )
        }
        else{
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor(config.embed.color)  
            .setDescription(`${client.commands.filter(command => command.help).map(command => `→ **${config.prefix}${command.name}**\n`).join(' ')}\n\nPour plus d'informations sur une commande, tapez ${config.prefix}help [nom de la commande].\n\n[] = Non obligatoire\n<> = Obligatoire`)
            .setFooter(config.embed.botby, config.embed.logo))  
        }
    },
    name: 'help',
    help: {
        description: 'Cette commande permet de lister les commandes disponibles sur le bot et d\'obtenir de l\'aide pour les commandes.',
        syntax: '[nom de la commande]'
    }
}