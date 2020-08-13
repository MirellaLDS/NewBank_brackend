const express = require('express');
const UserController = require('../controllers/UserController');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = express.Router();
