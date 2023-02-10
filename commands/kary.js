const { MessageEmbed } = require("discord.js"),
      mysql = require("mysql");  
require("dotenv").config()

module.exports = {
    name: "kary",
    category: "default",
    run: (client, message, args) => {
        const connection = mysql.createConnection({
            host     : "54.38.131.251",
            port     : "3306",
            user     : "db_89858",
            password : "qknznVyZvG2g",
            database : "db_89858"
        });

        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setDescription("Podaj serial osoby której chcesz zobaczyc kary!")
            .setColor("#19762c")
        )

        connection.query(`SELECT * FROM pystories_punish WHERE serial = "${args[0]}"`, (err, rows) => {
            if (!rows.length) return message.channel.send(new MessageEmbed()
                .setDescription("Osoba nie posiada zadnych kar!")
                .setColor("#FF00FF")
            )

            const embed = new MessageEmbed()
                .setAuthor("Posiadane kary")
                .setDescription(`Witaj, w systemie kar ${client.user.username}, znajdziesz tutaj wiele informacji na temat kar użytkownika. Poniżej, jak możesz zauważyć zostały ukazane wszystkie informacje o karach użytkownika.`)
                .setColor("#19762c")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))

            rows.map(kara => {
                embed.addField(`Typ kary: ${kara.type}`, `Czas: ${kara.time} \nAktywna: ${{ "1": "Tak", "0": "Nie" }[kara.active]}\nPowód: ${kara.reason}`, true)
            })

            message.channel.send(embed)
        })
    }
}