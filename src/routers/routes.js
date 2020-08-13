const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const BoletoController = require("../controllers/TransactionsController");
const UserController = require("../controllers/UserController");

const routes = express.Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "NewBank",
          description: "O servidor em questão fornecerá informações sobre uma conta bancária vinculada ao usuário proprietário do dispositivo.",
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
    apis: ["./src/models/*.js", "./src/routes.js"]
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
 *    description: The server is running
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.get('/', (req, res) => {
    return res.json({menssagem: `Servidor ativo`});
});

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/pagamento', BoletoController.pay);
routes.get('/boleto', BoletoController.gerarBoleto);

// catch 404 and forward to error handler
routes.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
routes.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = routes;