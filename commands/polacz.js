const { MessageEmbed } = require("discord.js"),
      mysql = require("mysql"); 
require("dotenv").config()  

module.exports = {
    name: "polacz",
    category: "default",
    run: (client, message, args) => {
        message.channel.send(new MessageEmbed()
        .setDescription("Ta komenda jest aktualnie wyłączona!")
        .setColor("#19762c")
        )
        return;
        const connection = mysql.createConnection({
            host     : "54.38.131.251",
            port     : "3306",
            user     : "db_89858",
            password : "qknznVyZvG2g",
            database : "db_89858"
        });

        if (message.guild) return message.channel.send(new MessageEmbed()
            .setDescription("Tej komendy możesz użyc jedynie poprzez prywatną wiadomość z botem!")
            .setColor("#19762c")
        )
        else if (!args[0] || isNaN(args[0])) return message.channel.send(new MessageEmbed()
            .setDescription("Podaj prawidłowy kod weryfikacyjny!")
            .setColor("#19762c")
        )

        connection.query(`SELECT * FROM pystories_users WHERE kod = "${args[0]}"`, (err, rows) => {
            if (!rows.length) return message.channel.send(new MessageEmbed()
                .setDescription("Podany kod weryfikacyjny jest nieprawidłowy!")
                .setColor("#19762c")
            )

            connection.query(`SELECT * FROM discord_connect WHERE serial = "${rows[0].serial}"`, (err, rows1) => {
                connection.query(`SELECT * FROM discord_connect WHERE did = "${message.author.id}"`, (err, rows2) => {
                    if (rows1.length || rows2.length) return message.channel.send(new MessageEmbed()
                        .setDescription("To konto jest już połączone z naszym serwerem!")
                        .setColor("#19762c")
                    )

                    message.channel.send(new MessageEmbed()
                        .setTitle('🔰 Synchronizacja konta')
                        .setDescription("🕹️Pomyślnie połączono konto z naszym serwerem! \n Wykonaj `reconnect` w swojej konsoli, aby zobaczyć swój avatar!")
                        .setColor("#19762c")
                    )

                    connection.query(`INSERT INTO discord_connect (did, sid, serial, avatarurl) VALUES ("${message.author.id}", "${rows[0].id}", "${rows[0].register_serial}", "${message.author.avatarURL({ format: "png", size: 512 })}")`, (err) => { if (err) throw err; return; })
                    connection.query(`UPDATE pystories_users SET discordconnected = "TAK" WHERE kod = "${args[0]}"`, (err) => { if (err) throw err; return; })
                })
            })
        })
    }
}