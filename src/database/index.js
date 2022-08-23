const mongoose = require('mongoose');
const c = require('colors');

module.exports = {
    start() {
        try{
            mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    
            console.log(c.red('[DataBase] - Conectado ao Banco de Dados.')) 
        } catch (err) {
            if(err) return console.log(c.red('[DataBase] = ERROR:', + err))
        }
    }
}