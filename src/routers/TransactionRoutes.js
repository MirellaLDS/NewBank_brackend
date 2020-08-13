const express = require('express');
const TransectionController = require('../controllers/TransactionsController');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = express.Router();
