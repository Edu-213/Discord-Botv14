const Command = require('../../structures/Command');
const {salvatudo} = require("../../funcoes/funcoes");
const warnModel = require("../../database/Schemas/warnModel");
const ClientEmbed = require("../../utils/ClientEmbed")
const Emojis = require("../../utils/Emojis")
const moment = require('moment');
moment.locale('pt-br');

module.exports = class warnlist extends Command {
    constructor(client) {
        super(client, {
            name: 'warnlist',
            description: 'Ver a lista de advertência de um membro',
            options: [
                {
                    name: 'membro',
                    type: 6,
                    description: 'Coloque o usuário para as advertências.',
                    require: true,
                },
            ]
        })
    }

    run = async (interaction) => {

        const user = interaction.options.getUser('membro');

        await salvatudo(interaction.guild.id, user.id)
        let data = await warnModel.findOne({guild: interaction.guild.id, user: user.id});
        if(data.warnings.length == 0) return interaction.reply({content: `${interaction.user}, ${user} não possui advertências no servidor!`, ephemeral: true});

        const texto = data.warnings.map((warn, index) => `\n\
        \n**Advertido**
        **Advertência #${index + 1}**
        **Punido por:** ${interaction.guild.members.cache.get(warn.moderador)}
        **Motivo:** ${warn.motivo}
        **Data:** ${moment(warn.timestamp).format(" DD [de] MMMM, YYYY [ás] H:m")}`)

        const embed = new ClientEmbed()
        .setTitle(`${Emojis.adv} Lista de Avertências`)
        .setDescription(`${texto.join(" ")}`)
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
        interaction.reply({embeds: [embed]})
    }
}
