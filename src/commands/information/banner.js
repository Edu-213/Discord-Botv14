const Command = require('../../structures/Command');
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, InteractionResponse  } = require("discord.js");
const axios = require('axios');

module.exports = class banner extends Command {
    constructor(client) {
        super(client, {
            name: 'banner',
            description: '[Discord] Ver o banner de um membro',
            options: [
                {
                    name: 'membro',
                    type: 6,
                    description: 'Coloque o usuário para ver o banner.',
                    require: false
                }
            ]
        })
    }

    run = async (interaction) => {

    let user = interaction.options.getUser('membro') || interaction.user;

    axios
        .get(`https://discord.com/api/users/${user.id}`, {
        headers: {
            Authorization: `Bot ${this.client.token}`,
        },
    })
    .then((res) => {
        const { banner } = res.data;
    
        if(banner) {
            
            const extension = banner.startsWith("a_") ? '.gif?size=4096' : '.png?size=4096'; 
            const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;
    
            let embed = new EmbedBuilder()
            .setTitle(`**|** ${user.username}`)
            .setColor("Blue")
            .setImage(url);
    
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel('Clique aqui para baixar a imagem!')
                .setStyle('5')
                .setURL(url)
    )
     
    interaction.reply({embeds: [embed], components: [button]})
    } else {
                interaction.reply(`${interaction.user} este usuário não possui um banner!`)
            }
    }) 
    }
}