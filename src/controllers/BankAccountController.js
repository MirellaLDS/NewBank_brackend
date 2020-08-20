const Account = require("../models/BankAccount");
const generate = require('../utils/generate');
const UserService = require('../services/UserService');
const BankAccountService = require('../services/BankAccountService');

module.exports = {

    async index(req, res) {
        const { cpf, pws } = req.headers;
        try {
            const account = await BankAccountService.getAccount(cpf, pws);

            if (!account) {
                throw new Error('Não existe conta para o usuário');
            }

            return res.status(200).json(account);
        }
        catch (err) {
            return res.status(400).json({ 'erro': err.message });
        }
    },

    async list(req, res) {
        const { cpf } = req.headers;

        if (cpf !== 'adminUser') {
            return res.status(401).json({ 'erro': 'Você não tem autorização para esta rota!' });
        }

        const accounts = await Account.find();

        return res.status(200).json(accounts);
    },

    async store(req, res) {
        const { account_balance } = req.body;
        const { cpf, pws } = req.headers;

        try {
            if (account_balance <= 0) {
                throw new Error('O valor precisa ser positivo.');
            }

            const user = await UserService.getUser(cpf, pws);

            const existAccount = await Account.findOne({ user });

            if (existAccount) {

                if (existAccount.status === 1) {
                    throw new Error('Já existe uma conta para este usuário: ' + existAccount.code);
                }

                existAccount.account_balance += account_balance;
                existAccount.status = 1;

                await existAccount.save();
                return res.status(200).json(existAccount);
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
        catch (err) {
            return res.status(400).json({ 'erro': err.message });
        }

    },

    async cancelamento(req, res) {
        const { cpf, pws } = req.headers;

        try {
            const account = await BankAccountService.getAccount(cpf, pws);

            account.status = 3;

            await account.save();

            return res.status(200).send();
        }
        catch (err) {
            return res.status(400).json({ 'erro': err.message });
        }
    },

    async update(req, res) {
        const { cpf, pws } = req.headers;
        const { status } = req.body;
        try {
            if (!(status >= 0 || status <= 3)) {
                throw new Error('Status inválido, verifique e tente novamente.');
            }

            const account = await BankAccountService.getAccount(cpf, pws);

            account.status = status;

            await account.save();

            return res.status(200).send();
        }
        catch (err) {
            return res.status(400).json({ 'erro': err.message });
        }
    }
};