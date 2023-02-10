const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", async member => {
        member.send(new MessageEmbed()
            .setDescription(`Witaj ${member.user.username}, \nWłaśnie dołączyłeś/aś na Discorda serwera creamMTA\n❓ Jeżeli masz jakieś pytania odnośnie serwera napisz wiadomość do naszej Administracji\n🔰 Połącz swoje konto Discord z grą przy użyciu komendy !polacz\n\n🕹️ Życzymy miłej gry!`)
            .setColor("#19762c")
        )
    })
}