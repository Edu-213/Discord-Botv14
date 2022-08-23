const Command = require('../../structures/Command');

module.exports = class ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'mostra o ping do bot',
        })
    }

    run = async (interaction) => {
        interaction.reply(`O meu ping é \`${this.client.ws.ping}\` ms`)
    }
}
