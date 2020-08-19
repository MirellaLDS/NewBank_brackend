const User = require("../models/User");
const UserService = require('../services/UserService');

module.exports = {

    async index(req, res) {
        const { cpf, pws } = req.headers;
        try{
            const user =  await UserService.getUser(cpf, pws);

            return res.status(200).json(user);
        }
        catch (err){
            return res.status(400).json({'erro': err.message});
        }
    },

    async list(req, res) {
        const { cpf } = req.headers;
        console.log(cpf);

        if (cpf !== 'userAdmin') {
            return res.status(401).json({'erro': 'Você não tem autorização para esta rota!'});
        }        

        const users = await User.find();

        return res.json(users);
    },

    async update(req, res) {
        const { _id, cpf, name, avatar, telefone, pws } = req.body;

        console.log("Entrou na rota!");

        if (!cpf || !name || !telefone || !pws){
            return res.status(400).json({'erro': 'Os campos "cpf", "name", "telefone" e "pws" são obrigatórios, verifique e tente novamente!'});
        }

        await User.updateOne( 
            {"_id": _id},
            {$set: {            
                name,
                cpf,
                pws,
                telefone,
                avatar
            }},
            {upsert: true}
        );
        
        return res.json(await UserService.getUser(cpf, pws));
    },
    async store(req, res) {
        const { cpf, name, avatar, telefone, pws } = req.body;

        if (!cpf || !name || !telefone || !pws){
            return res.status(400).json({'erro': 'Os campos "cpf", "name", "telefone" e "pws" são obrigatórios, verifique e tente novamente!'});
        }

        const userExists = await User.findOne({ cpf:  cpf });
        if (userExists) {
            return res.json({mensagem:'Usuário existente'});
        } 

        const user = await User.create({
            name,
            cpf,
            pws,
            telefone,
            avatar
        });
            
        return res.json(user);
        }       
    };