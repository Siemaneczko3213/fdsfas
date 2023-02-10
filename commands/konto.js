const { MessageEmbed } = require("discord.js"),
      mysql = require("mysql");  
require("dotenv").config()

module.exports = {
    name: "konto",
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
            .setDescription("Podaj sid osoby!")
            .setColor("#19762c")
        )

        connection.query(`SELECT * FROM pystories_users WHERE id = "${args[0]}"`, (err, rows) => {
            if (err) throw err;
            if (!rows.length) return message.channel.send(new MessageEmbed()
                .setDescription("Taka osoba nie istnieje w naszej bazie danych!")
                .setColor("#19762c")
            )

            const replace = {
                "1": "Tak",
                "0": "Nie"
            }

            const embed = new MessageEmbed()
			.setTitle("Informacje na temat twojego konta na serwerze creamRPG!")
            .setDescription(`🧛‍♀️Login **${rows[0].login}** \n 💠SRP **${rows[0].srp}** \n 💰Pieniądze przy sobie! **${rows[0].money}** \n 💰Pieniądze w banku **${rows[0].bank_money}** \n 🔰Połączone konto **${replace[rows[0].discordconnected]}** \n \n **PRAWO JAZDY** \n \n 🛵Prawo jazdy (A) **${replace[rows[0].pjA]}** \n 🚗Prawo jazdy (B) **${replace[rows[0].pjB]}** \n 🚎Prawo jazdy (C) **${replace[rows[0].pjC]}** \n✈Prawo jazdy (L) **${replace[rows[0].pjL]}** \n \n ` ) 
            .setColor("#19762c")
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    })
}
}
