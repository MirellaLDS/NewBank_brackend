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
        const { cpf, pws } = req.headers;
        const { amount } = req.body;

        try{
            if (amount <= 0) {
                throw new Error('O valor do depósito precisa ser positivo.');
            }

            const account = await BankAccount.getAccount(cpf, pws);

            if (!account) {
                throw new Error('Não existe conta para o usuário');
            }

            account.account_balance += amount;

            await account.save();

            return res.status(200).json({'mensagem': 'Depósito realizado com sucesso!'});
            }
        catch (err){
            return res.status(400).json({'erro': err.message});
        }
    },
    
    async transferencia(req, res) {
        const { to, amount } = req.body;
        const { cpf, pws } = req.headers;

        try{
            if (amount <= 0) {
                throw new Error('O valor da transferência precisa ser positivo.');
            }

            const userAccount = await BankAccount.getAccount(cpf, pws);

            if (!userAccount) {
                throw new Error('Não existe conta para o usuário');
            }

            if (userAccount.account_balance < amount){
                throw new Error('Saldo insuficiente para a transferência.');
            }

            const recipientAccount = await Account.findOne({code: to});
            if (!recipientAccount) {
                throw new Error('Conta do destinatário não encontrada.');
            }

            userAccount.account_balance -= amount;
            recipientAccount.account_balance += amount;

            await userAccount.save();
            await recipientAccount.save();

            return res.status(200).json({'mensagem': 'Transferência realizada com sucesso!'});

            }
        catch (err){
            return res.status(400).json({'erro': err.message});
        }
    }
};