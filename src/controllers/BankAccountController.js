const Account = require("../models/BankAccount");
const generate = require('../utils/generate');
const UserService = require('../services/UserService');
const BankAccountService = require('../services/BankAccountService');


module.exports = {

    async index(req, res) {
        const { cpf, pws } = req.headers;
        try{
            const account = await BankAccountService.getAccount(cpf, pws);
    
            if (!account) {
                throw new Error('Não existe conta para o usuário');
            }

            return res.status(200).json(account);
        }
        catch (err){
            return res.status(400).json({'mensagem': err.message});
        }
    },

    async list(req, res) {
        const { cpf } = req.headers;

        if (cpf !== 'adminUser') {
            return res.status(401).json({mensagem: 'Você não tem autorização para esta rota!'});
        }

        const accounts = await Account.find();

        return res.status(200).json(accounts);
    },

    async store(req, res) {
        const { account_balance } = req.body;
        const { cpf, pws } = req.headers;

        try{
            const user = await UserService.getUser(cpf, pws);
            const existAccount = await BankAccountService.getAccount(cpf, pws);

            if (existAccount) {
                return res.status(400).json({mensagem: 'Já existe uma conta para este usuário: ' +  existAccount.code });
            }

            const account = await Account.create({
                bank_branch: '0001',
                code: generate.code(),
                user,
                account_balance,
                status: 1
            });

            return res.status(200).json(account);
        } 
        catch (err){
            return res.status(400).json({'mensagem': err.message});
        }

    },

    async cancelamento(req, res) {
        const { cpf, pws } = req.headers;
    
        try{
            const account = await BankAccountService.getAccount(cpf, pws);

            account.status = 0;

            await account.save();

            return res.status(200);
        }
        catch (err){
            return res.status(400).json({'mensagem': err.message});
        }
    }
};