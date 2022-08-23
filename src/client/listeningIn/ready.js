const Event = require('../../structures/Event');
const { ActivityType } = require('discord.js');
const c = require('colors')
const cfonts = require('cfonts');

module.exports = class ready extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        /*
        const banner = cfonts.render((`Estou on!`), {
            font: 'block',
            color: 'candy',
            align: 'left',
            gradient: ["red","magenta"],
            lineHeight: 3
        });
    console.log(banner.string); 
    */
        console.log(c.red(`✅ ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores!`))
        //this.client.user.setPresence({ activities: ({ name: 'aaaaaaaaaa', type: ActivityType.Watching })}) //defina o name para aparecer na presence do bot.
        //this.client.user.setStatus('online') //status do bot, veja no discord.js as outras opções
        this.client.registryCommands()

    }
}