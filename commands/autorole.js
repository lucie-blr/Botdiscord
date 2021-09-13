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
            .setTitle(`Reaction Role`)
            .setDescription(`Si vous souhaitez accéder à certains channels communautaires, il vous faut réagir avec la réaction qui va avec le channel !`)
            .addFields({name: "💻 → Informatique", value: "Pour les passionnés d'informatique et de jeu vidéo !"})
            .addFields({name: "👺 → Fan du Japon", value: "Si vous voulez discuter de manga, de culture japonaise, et autre, c'est ici !"})
            .addFields({name: "🎵 → Musique", value: "Même ici il y a des passionnés de musique, et vous pouvez en discuter pleinement !"})
            .addFields({name: "💩 → Shitpost", value: "Pour spam, envoyer n'importe quoi ou dire des bêtises, rendez-vous là !"})
            .addFields({name: "🔞 → NSFW", value: "Ai-je vraiment besoin de décrire ce channel ?"})
            .addFields({name: "🤣 → Humour", value: "Il y a des humoristes partout, même quand ils ne sont pas drôles !"})
            .addFields({name: "📚 → Travail", value: "Pour tous les gens souhaitant travailler, c'est par ici !"})
            .setImage('https://i.pinimg.com/originals/76/b4/64/76b4645640120014ba9c4fb26dbd40fd.gif')
            .setFooter(config.embed.botby, config.embed.logo)
        ).then(message => {
            message.react('💻'); //informatique
            message.react('👺'); //japan
            message.react('🎵'); //musiques
            message.react('💩'); //shitpost
            message.react('🔞'); //nsfw
            message.react('🤣'); //humour
            message.react('📚'); //Travail
        })
        .catch(err => {
            throw err;
          });
        
    },
    name: 'autorole',
    
}