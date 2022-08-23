const Command = require('../../structures/Command');
const {salvatudo} = require("../../funcoes/funcoes");
const warnModel = require("../../database/Schemas/warnModel");
const Emojis = require('../../utils/Emojis');
const ClientEmbed = require('../../utils/ClientEmbed');

module.exports = class warn extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            description: 'Dar advertencia a um membro',
            options: [
                {
                    name: 'membro',
                    type: 6,
                    description: 'Coloque o usuário para advertir.',
                    require: true,
                },
                {
                    name: 'motivo',
                    type: 3,
                    description: 'Por qual motivo o membro está sendo advertido',
                    require: false
                }
            ]
        })
    }

    run = async (interaction) => {

    if (!interaction.member.permissions.has("KickMembers")) return interaction.reply({content: `${interaction.user}, Você não possui a permissão \`Expulsar membros\` para poder utilizar este comando.`, ephemeral: true})
    let user = interaction.options.getMember('membro');
    let motivo = interaction.options.getString('motivo')

    await salvatudo(interaction.guild.id, user.id);
  
    if(user.id == interaction.guild.ownerId) {return interaction.reply({content: `${interaction.user}, Você não pode advertir o dono do servidor!`, ephemeral: true});
    } else if (user.id == interaction.user.id) return interaction.reply({content: `${interaction.user}, você não pode se advertir!`, ephemeral: true});
    if (user.roles.highest.position) return interaction.reply({content: `${interaction.user}, Eu não posso punir este membro, meu cargo e menor que o do membro a ser punido!`, ephemeral: true});

        const aviso = new ClientEmbed() 
        .setTitle(`${Emojis.adv} Nova Advertência`)
        .addFields(
          {
            name: "Membro:",
            value: `${user}`,
          },
          {
            name: "Autor:",
            value: `${interaction.user}`,
          },
          {
            name: "Motivo:",
            value: `\`\`\`${motivo}\`\`\``,
          }
        )

        interaction.reply({embeds: [aviso]})

        let objeto_warn = {
          timestamp: Date.now(),
          moderador: interaction.user.id,
          motivo,
      }
      
      await warnModel.findOneAndUpdate({guild: interaction.guild.id, user: user.id}, {
          $push: {
              warnings: objeto_warn
          }
      })
    }
  }
  
