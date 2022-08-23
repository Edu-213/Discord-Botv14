const Command = require('../../structures/Command');
const { ActionRowBuilder, ButtonBuilder  } = require("discord.js");
const Emojis = require(`../../utils/Emojis`)
const ClientEmbed = require(`../../utils/ClientEmbed`)

module.exports = class sugestao extends Command {
    constructor(client) {
        super(client, {
            name: 'sugestao',
            description: 'Envia o painel de sugestão em um chat especifico.',
            options: [
                {
                    name: 'canal',
                    description: 'Selecione um canal de texto.',
                    type: 7,
                    required: true,
                }
            ],
        })
    }

    run = async (interaction) => {

let channel = interaction.options.getChannel('canal')

if (!interaction.member.permissions.has("ManageChannels"))
    return interaction.reply({content: `${interaction.user}, Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`, ephemeral: true,})

    interaction.reply({
        content: `${interaction.user}, O painel de sugestão foi enviado em ${channel} com sucesso.`,
        ephemeral: true,
    })

    const sug = new ClientEmbed()
    .setTitle(`${Emojis.lamp} Ajude o servidor a melhorar!`)
    .setDescription(`Olá, jogador! Deixe aqui sua sugestão para podermos avaliá-la.`)
    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })

    const but = new ButtonBuilder()
    .setCustomId('botao_modal')
    .setLabel('Sugestão')
    .setEmoji(`${Emojis.env}`)
    .setStyle(1)

    const row = new ActionRowBuilder() .addComponents(but)

    channel.send({embeds: [sug], components: [row] })
}
}