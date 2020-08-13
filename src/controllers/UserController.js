const User = require("../models/User");

module.exports = {

    async index(req, res) {
        const { cpf, pws } = req.headers;

        console.log("Index");

        const loggedUser = await User.findOne({ cpf: cpf });
        console.log(loggedUser);

        if(loggedUser && loggedUser.pws == pws) {
            return res.json(loggedUser);
        } else {
            return res.json({mensagem:'Credenciais inválidas'});
        }        
    },
    async store(req, res) {
        const { cpf, name, avatar, telefone, pws } = req.body;

        console.log("store");

        const userExists = await User.findOne({ cpf: cpf });
        if (userExists) {
            console.log(userExists);
            return res.json(userExists);
        } else {
            const user = await User.create({
                name,
                cpf,
                pws,
                telefone,
                avatar
            });
    
            return res.json(user);
        }       
    }
};