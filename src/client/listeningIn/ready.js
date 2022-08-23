const Event = require('../../structures/Event');
const c = require('colors')

module.exports = class ready extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(c.red(`ONLINE`))
        this.client.registryCommands()

    }
}
