const User = require("../models/User");
const Account = require("../models/BankAccount");
const Boleto = require('@mrmgomes/boleto-utils');
const BankAccount = require('../services/BankAccountService');

module.exports = {
    async pay(req, res) {
        return res.send("Pagamento");
    },
    
    async gerarBoleto(req, res) {
        //https://www.npmjs.com/package/@mrmgomes/boleto-utils
       var result = Boleto.geraCodBarras('23790448095616862379336011058009740430000124020');
        console.log("Resposta");
        return res.json(result);
    },
    
    async deposito(req, res) {
        return res.send("Deposito");
    },
    
    async trasnferencia(req, res) {
        const { to, value } = req.body;
        const { cpf, pws } = req.headers;

        try{
            const account = await BankAccount.getAccount(cpf, pws);

            if (!account) {
                throw new Error('Não existe conta para o usuário');
            }

            if (account.account_balance < value){
                throw new Error('Saldo insuficiente para a transferência.');
            }

            }
        catch (err){
            return res.status(400).json({'mensagem': err.message});
        }
    }
};