const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const TransactionController = require("../controllers/TransactionsController");
const UserController = require("../controllers/UserController");
const BankAccountController = require('../controllers/BankAccountController');
const ShellController = require("../controllers/ShellController");

const routes = express.Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "NewBank",
          description: "O servidor em questão fornecerá informações sobre uma conta bancária vinculada ao usuário proprietário do dispositivo."+ 
          "\n\n **Verifique a documentação de API pelo postman.**",
          contact: {
            name: "Mirella Lins"
          }
        },
        servers: [
            {
              url: "http://localhost:3333"
            },
            {
              url: "https://exampletindev-backend.herokuapp.com"
            }
          ]
    },
    apis: ["./src/models/*.js", "./src/routers/routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const options = {
    explorer: true
};

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocs, options));

/**
 * @swagger
 * /:
 *  get:
 *    description: The server is running. Verifique a documentação de API pelo postman.
 *    responses:
 *      '200':
 *        description: O servidor ativo
 *      '500': 
 *        description: Tem algo de errado com o servidor
 */
routes.get('/', (req, res) => {

  const result = {
    mensagem: "Servidor ativo",
    swagger: "http://localhost:3333/api-docs/",
    postman: "https://documenter.getpostman.com/view/472946/T1LPD7FG"
  }

  return res.json(result);
});

// Shell routes
routes.get('/shell', (req, res) => {
  res.send(`<h1> A resposta demora um pouco, então não estresse! O log aparece se você acrescentar  <u style='color:red'>/shell/logs</u> a url.</h1>`);
});

routes.use('/shell/logs', ShellController.index);


// USER ROUTES
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/info', UserController.getById);
routes.get('/getAllUsers', UserController.list);
routes.put('/user/update', UserController.update);

// ACCOUNT ROUTES
routes.post('/accounts', BankAccountController.store);
routes.get('/accounts', BankAccountController.index);
routes.get('/accounts/info', BankAccountController.getById);
routes.delete('/accounts', BankAccountController.cancelamento);
routes.put('/accounts', BankAccountController.update);
routes.get('/getAllAccounts', BankAccountController.list);
routes.put('/accounts/cancel', BankAccountController.cancelamento);

// Transactions
// routes.post('/pagamento', TransactionController.pay);
routes.get('/boleto', TransactionController.gerarBoleto);
routes.post('/transaction/deposito', TransactionController.deposito);
routes.post('/transaction/transferencia', TransactionController.transferencia);
routes.post('/transaction/pagamento', TransactionController.pay);
routes.get('/transaction/getByUser', TransactionController.index);

// catch 404 and forward to error handler
routes.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
routes.use(function(err, req, res, next) {
  console.log(`code: ${err.status} e mensagem: ${err.message}`);
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status,
      message: err.message
    }
  });
});

module.exports = routes;