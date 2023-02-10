const { MessageEmbed } = require("discord.js");
require("dotenv").config()  

module.exports = {
    name: "pomoc",
    category: "default",
    run: (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor("creamMTA")
            .setDescription('`Pomoc` - panel który ci się wyświetla!\n`!Polacz` - polącz konto z grą! \n`!Konto` - wyświetla dane o koncie! \n `!Pojazd` - wyświetla informacje o danym pojeżdzie! \n `!Pojazdy` - wyświetla liste twoich pojazdów! \n `!Kary` - wyświetla liste twoich kar!')
            .setColor("#0bb513")
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}