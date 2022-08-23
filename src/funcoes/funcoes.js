const warnModel = require("../database/Schemas/warnModel");
const c = require('colors')

module.exports = {
    salvatudo,
}

async function salvatudo(guildid, userid) {
    if (guildid) {
    if(guildid && userid){
        let warn_data = await warnModel.findOne({ guild: guildid, user: userid })
        if (!warn_data) {
            console.log(c.red(`[Salvando] - Advertências de ${userid} em ${guildid}`));
            warn_data = await new warnModel({
                guild: guildid,
                user: userid,
                warnings: [],
            });
            await warn_data.save();
        }
    }
}
}
