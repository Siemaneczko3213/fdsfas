const { Client, Collection } = require("discord.js"),
      fs = require("fs"),
      Gamedig = require("gamedig");
require("dotenv").config();

class App extends Client {
    constructor() {
        super();

        this.commands = new Collection();
        for (const i of fs.readdirSync("./handlers")) {
            require("./handlers/" + i)(this);
        }
        
        this.login(process.env?.TOKEN).then(() => {
            console.log(`Połączono jako ${this.user.tag}`);
            this.user.setActivity(`Ładowanie statystyk..`, {type: "PLAYING"})
            
            setInterval(() => {
                Gamedig.query({ socketTimeout: 2000, attemptTimeout: 10000, type: "mtasa", host: "54.38.132.159", port: "21044"}).then((state) => {
                    this.user.setActivity(`Gracze: ${state.raw.numplayers}/${state.maxplayers}`, { type: "PLAYING" })
                });
            }, 30000)
        })
    }
}

new App();
