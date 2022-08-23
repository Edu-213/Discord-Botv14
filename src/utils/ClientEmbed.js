const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, InteractionResponse  } = require("discord.js");

module.exports = class ClientEmbed extends (
    EmbedBuilder
) {
    constructor( member, data = {} ) {
        super(data);
        this.setTimestamp();
        this.setColor('Blue')
        //this.setFooter(`Pedido por ${member.tag}`,member.displayAvatarURL({ dynamic: true }));
    }
}