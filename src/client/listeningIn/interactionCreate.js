const Event = require('../../structures/Event');
const { ActionRowBuilder, ButtonBuilder, ModalBuilder} = require("discord.js");
const ClientEmbed = require('../../utils/ClientEmbed')
const Emojis = require('../../utils/Emojis')
const Discord = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate',
        })
    }

    run = async (interaction, client) => {
        if (interaction.isChatInputCommand()) {
            if (!interaction.guild) return;
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            if (cmd) {
                if (cmd.requireDatabase) {
                    interaction.guild.db =
                        await this.client.db.guilds.findById(interaction.guild.id) ||
                        new this.client.db.guilds({ _id: interaction.guild.id })
                }
                cmd.run(interaction)
            }
        };

        //modal sugestão
        if (interaction.isButton()) {
            if (interaction.customId.startsWith("botao_modal")) {
              const modal = new ModalBuilder()
                .setCustomId('modal_sugestao')
                .setTitle(`Sugestão`)
              const sugs = new Discord.TextInputBuilder()
                .setCustomId('sugestão')
                .setMaxLength(200)
                .setLabel('Qual sua sugestão?')
                .setStyle(Discord.TextInputStyle.Paragraph)
        
              const row = new ActionRowBuilder().addComponents(sugs);
              modal.addComponents(row)
              await interaction.showModal(modal);
        
              interaction.followUp({content: `${interaction.user}, O mau uso deste canal resultará em punição.`, ephemeral: true})
            }
          }
        
          if (!interaction.isModalSubmit()) return;
          if (interaction.customId === 'modal_sugestao') {
            let channel = interaction.guild.channels.cache.get('977925058032963646') //canal para o envio da sugestão.
            const sugt = interaction.fields.getTextInputValue('sugestão');
        
            interaction.reply({content: `${interaction.user}, Sua sugestão foi enviada com sucesso!`, ephemeral: true})
        
            const embed = new ClientEmbed()
            .setAuthor({name: `${Emojis.Lista} Nova Sugestão`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`> ${interaction.user} fez uma nova sugestão. \n${Emojis.env} **Sugestão** \n\`\`\`${sugt}\`\`\``)
            
            channel.send({embeds: [embed]})
          }
    }
    
}