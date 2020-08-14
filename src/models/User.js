"use strict";
const { Schema, model } = require("mongoose");

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - cpf
 *          - pws
 *        properties:
 *          name:
 *            type: string
 *            description: Name of user
 *          cpf:
 *            type: string
 *            description: cpf of user
 *          pws:
 *            type: string
 *            description: passwors of user
 *          avatar:
 *            type: string
 *            description: Avatar do perfil
 *          telefone:
 *            type: string
 *            description: telefone
 *        example:
 *           name: Mirella Lins
 *           bank_account: 123456
 */

const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      avatar: String,
      telefone: String,
      cpf: {
        type: String,
        requireq: true
      },
      pws: {
        type: String,
        requireq: true
      },
    },
    {
      timestamps: true
    }
  );
  
  module.exports = model("User", UserSchema);