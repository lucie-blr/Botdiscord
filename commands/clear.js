const Discord = require('discord.js'),
client = new Discord.Client({
    fetchAllMembers: true
}),
config = require('../config.json'),
fs = require('fs')


module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'éxéctuer cette commande.')
        
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send('Veuillez indiquer un nombre de message à supprimer.')
        if (count < 1 || count > 99) return message.channel.send('Le nombre de message doit être compris entre 1 et 99.')
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.embed.color)      
            .setTitle('Clear')
            .setDescription(`${size - 1} messages ont été supprimés !`)
            .setFooter(config.embed.botby, config.embed.logo)
        ).then(sent => sent.delete({timeout: 5e3}))
        
    },
    name: 'clear',
    guildOnly: true,
    help: {
        description: 'Supprimer un nombre compris entre 1 et 99 de message(s).',
        syntax: '<nombre>'
    }
}