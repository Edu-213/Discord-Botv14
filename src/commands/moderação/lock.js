const Command = require('../../structures/Command');
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, InteractionResponse  } = require("discord.js");


module.exports = class lock extends Command {
    constructor(client) {
        super(client, {
            name: 'lock',
            description: '[Moderação] Desabilitar @everyone de enviar mensagens em um canal específico',
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has("ManageChannels")) {
            interaction.reply(`Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`)
        } else {
            
            interaction.reply(`✅ Este chat foi trancado com sucesso.`).then(msg => { 
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                console.log(e)
                interaction.edit(`❌ Ops, algo deu errado ao tentar trancar este chat.`)
                
            })
        })

            }
        }        
}