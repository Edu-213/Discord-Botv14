const Command = require('../../structures/Command');
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, InteractionResponse  } = require("discord.js");

module.exports = class avatar extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: '[Discord] Ver o avatar de um membro',
            options: [
                {
                    name: 'membro',
                    type: 6,
                    description: 'Coloque o usuário para ver o avatar.',
                    require: false
                }
            ]
        })
    }

    run = async (interaction) => {

    let user = interaction.options.getUser('membro') || interaction.user;
    const avatar = user.displayAvatarURL({ dynamic: true, farmat: "jpg", size: 2048,});

    const button = new ButtonBuilder()
    .setLabel('Clique aqui para baixar a imagem!')
    .setStyle('5')
    .setURL(avatar)

    const row = new ActionRowBuilder()
    .addComponents(button)

    const ava = new EmbedBuilder()
    .setTitle(`🖼️ **|** ${user.username}`)
    .setColor("Blue")
    .setImage(avatar);
    interaction.reply({embeds: [ava], components: [row]})
    }
}