const { MessageEmbed } = require("discord.js"),
      mysql = require("mysql");  
require("dotenv").config()

module.exports = {
    name: "pojazd",
    category: "default",
    run: (client, message, args) => {
        const connection = mysql.createConnection({
            host     : "54.38.131.251",
            port     : "3306",
            user     : "db_89858",
            password : "qknznVyZvG2g",
            database : "db_89858"
        });

        if (!args[0] || isNaN(args[0])) return message.channel.send(new MessageEmbed()
            .setDescription("Podaj prawidłowe id pojazdu!")
            .setColor("#19762c")
        )

        connection.query(`SELECT * FROM pystories_vehicles WHERE id = "${args[0]}"`, (err, rows) => {
            if (!rows.length) return message.channel.send(new MessageEmbed()
                .setDescription("Nie odnaleziono pojazdu o podanym id!")
                .setColor("#19762c")
            )

            const replace = {
                "0": "Nie",
                "1": "Tak",
                "true": "Tak",
                "false": "Nie"
            }

            const vehicleNames = {
                "592": "Andromada",
                "577": "AT-400",
                "511": "Beagle",
                "512": "Cropduster",
                "593": "Dodo",
                "520": "Hydra",
                "553": "Nevada",
                "476": "Rustler",
                "519": "Shamal",
                "460": "Skimmer",
                "513": "Stuntplane",
                "548": "Cargobob",
                "425": "Hunter",
                "417": "Leviathan",
                "487": "Maverick",
                "488": "News Chopper",
                "497": "Police Maverick",
                "563": "Raindance",
                "447": "Seasparrow",
                "469": "Sparrow",
                "472": "Coastguard",
                "473": "Dinghy",
                "493": "Jetmax",
                "595": "Launch",
                "484": "Marquis",
                "430": "Predator",
                "453": "Reefer",
                "452": "Speeder",
                "446": "Squalo",
                "454": "Tropic",
                "581": "BF-400",
                "509": "Bike",
                "481": "BMX",
                "462": "Faggio",
                "521": "FCR-900",
                "463": "Freeway",
                "510": "Mountain Bike",
                "522": "NRG-500",
                "461": "PCJ-600",
                "448": "Pizza Boy",
                "468": "Sanchez",
                "586": "Wayfarer",
                "602": "Alpha",
                "496": "Blista Compact",
                "401": "Bravura",
                "518": "Buccaneer",
                "527": "Cadrona",
                "589": "Club",
                "419": "Esperanto",
                "587": "Euros",
                "533": "Feltzer",
                "526": "Fortune",
                "474": "Hermes",
                "545": "Hustler",
                "517": "Majestic",
                "410": "Manana",
                "600": "Picador",
                "436": "Previon",
                "549": "Tampa",
                "491": "Virgo",
                "445": "Admiral",
                "604": "Damaged Glendale",
                "507": "Elegant",
                "585": "Emperor",
                "466": "Glendale",
                "492": "Greenwood",
                "546": "Intruder",
                "551": "Merit",
                "516": "Nebula",
                "467": "Oceanic",
                "426": "Premier",
                "547": "Primo",
                "405": "Sentinel",
                "580": "Stafford",
                "409": "Stretch",
                "550": "Sunrise",
                "566": "Tahoma",
                "540": "Vincent",
                "421": "Washington",
                "529": "Willard",
                "592": "Baggage",
                "431": "Bus",
                "438": "Cabbie",
                "437": "Coach",
                "574": "Sweeper",
                "420": "Taxi",
                "525": "Towtruck",
                "408": "Trashmaster",
                "552": "Utility Van",
                "470": "Patriot",
                "499": "Benson",
                "609": "Black Boxville",
                "498": "Boxville",
                "406": "Dumper",
                "573": "Dune",
                "531": "Tractor",
                "456": "Yankee",
                "459": "Berkley's RC Van",
                "422": "Bobcat",
                "482": "Burrito",
                "605": "Damaged Sadler",
                "530": "Forklift",
                "418": "Moonbeam",
                "572": "Mower",
                "582": "News Van",
                "413": "Pony",
                "440": "Rumpo",
                "543": "Sadler",
                "583": "Tug",
                "478": "Walton",
                "554": "Yosemite",
                "579": "Huntley",
                "400": "Landstalker",
                "404": "Perennial",
                "489": "Rancher",
                "505": "Rancher",
                "479": "Regina",
                "442": "Romero",
                "458": "Solair",
                "402": "Buffalo",
                "542": "Clover",
                "603": "Phoenix",
                "475": "Sabre",
                "429": "Banshee",
                "541": "Bullet",
                "415": "Cheetah",
                "480": "Comet",
                "562": "Elegy",
                "565": "Flash",
                "434": "Hotknife",
                "411": "Infernus",
                "559": "Jester",
                "561": "Stratum",
                "560": "Sultan",
                "506": "Super GT",
                "451": "Turismo",
                "558": "Uranus",
                "555": "Windsor",
                "477": "ZR-350"
            }

            const embed = new MessageEmbed()
                .setTitle(`Model ${vehicleNames[rows[0].model]} (ID:${args[0]})`)
                .setDescription(`Tutaj znajdziesz informacje o swoim pojeżdzie! \n \n **Ogólne informacje:** \n \n 👑Owner pojazdu: Owner: ${rows[0].ownedPlayer}  \n 📌ID pojazdu: ${rows[0].id} \n 🚘Nazwa: ${vehicleNames[rows[0].model]} \n ⛽Paliwo: ${rows[0].fuel} \n ⚒Przebieg: ${rows[0].mileage} \n ⚒Tuning: ${rows[0].dm3 || "brak"} \n \n**Tuning mechaniczny** \n \n⚙MK1: ${replace[rows[0].mk1]} \n ⚙MK2: ${replace[rows[0].mk2]} \n ⚙MK3: ${replace[rows[0].mk3]} \n ⚙MK4: ${replace[rows[0].mk4]} \n \n`)
                .setColor("#FF00FF")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
            message.channel.send(embed)
        });
    }
}