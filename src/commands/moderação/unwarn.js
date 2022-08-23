const Command = require('../../structures/Command');
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, InteractionResponse  } = require("discord.js");
const {salvatudo} = require("../../funcoes/funcoes");
const warnModel = require("../../database/Schemas/warnModel");
const Discord = require('discord.js')

module.exports = class unwarn extends Command {
    constructor(client) {
        super(client, {
            name: 'unwarn',
            description: '[Moderação] Retirar a advertencia de um membro',
            options: [
                {
                    name: 'membro',
                    type: 6,
                    description: 'Coloque o usuário para retirar a advertencia.',
                    require: true,
                },
                {
                    name: 'advertencia',
                    type: 4,
                    description: 'Cite o numero da advertencia que queira retirar',
                    require: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) return interaction.reply({content: `${interaction.user}, Você não possui a permissão \`Expulsar membros\` para poder utilizar este comando.`, ephemeral: true})
        let user = interaction.options.getMember('membro');
        let num = interaction.options.getInteger('advertencia')
        
        await salvatudo(interaction.guild.id, user.id);

        let id_warn = num - 1;

        let data = await warnModel.findOne({ guild: interaction.guild.id, user: user.id });

        if (user.id == interaction.user.id) return interaction.reply({content: `${interaction.user}, você não pode retirar advertencia de si mesmo.`, ephemeral: true});
        if (user.roles.highest.position) return interaction.reply({content: `${interaction.user}, Eu não posso punir este membro, meu cargo e menor que o do membro a ser punido!`, ephemeral: true});

        if (data.warnings.length === 0) return interaction.reply(`${interaction.user} O membro especificado não tem nenhuma advertência!`);
        if (isNaN(id_warn) || id_warn < 0) return interaction.reply(`${interaction.user} A advertência especificada não e válida!`);
        if(data.warnings[id_warn] == undefined) return interaction.reply(`${interaction.user} O membro tem menos que **${num}** advertências! Utilize, \`/warnlist\` para ver a lista de advertência de um membro.`);

       let warn = new EmbedBuilder()
        .setTitle(` | Advertência Removida`)
        .setDescription(`${interaction.user}, O membro teve uma advertência removida!`)
        interaction.reply({embeds: [warn]})
        data.warnings.splice(id_warn, 1);
        data.save();
    }
}