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
       
        message.delete()
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.embed.color)      
            .setTitle(`Règlement`)
            .setDescription(`Toutes les règles ici présentent sont obligatoires, peuvent être changé à tout moment et son défini par le staff. En validant le règlement, nous considéront que vous en avez prit confiance.`)
            .addFields({name: "Chat HRP", value: "Un respect mutuel est demandé pour une bonne convivialité. Insultes, d'homophobie, sexisme, etc. sont à éviter au maximum. Pour éviter une pollution du chat, il est demandé de bien utiliser les channels et de ne pas spam d'emoji, de gif, ou n'importe quoi d'autre. Si il y a une quelconque embrouille qui ne concerne que deux personnes, merci de la régler en MP."})
            .addFields({name: "Vocal", value: "Tout comme les salons textuels, les vocaux sont des lieux de discussion libre. Il est vivement conseillé de ne pas polluer ceux-ci, de rester calme et agréable. Il serait aussi apprécié de demander, en fonction de qui est en voc, avant d'en rejoindre un, pour ne pas s'introduire dans une conversation qui ne vous regarde pas. Enfin, évitez le troll sur rythme en changeant la musique d'autrui. Sera donné le rôle DJ de celui-ci à qui le demande."})
            .addFields({name: "Jeux", value: "Pour le confort de chacun, il est demandé d'être autant agréable en jeux qu'hors jeux. Vous ne pourrez pas espérer rejoindre l'alliance ou en être un allié si vous êtes méchant avec autrui !"})
            .addFields({name: "Validation", value:"Pour valider le règlement, réagissez avec ✅."})
            .setImage('https://i.pinimg.com/originals/55/18/7f/55187f0d3fcbf5809262e9b18aa32835.gif')
            .setFooter(config.embed.botby, config.embed.logo)
        ).then(message => {
            message.react('✅');
        })
        .catch(err => {
            throw err;
          });
        
        
    },
    name: 'rules',
    ifno: {
        description: 'afficher les règles.'
        
    }
}