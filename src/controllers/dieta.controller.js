const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const dietaSchema = require("../validations/dietaValidation");
const Dietas = require('../models/dietas')(sequelize, Sequelize);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);
class DietaController {
    async create(req, res) {

        // #swagger.tags = ['Dietas']
        // #swagger.summary = 'Criar uma nova dieta'
        // #swagger.description = 'Endpoint para criar uma nova dieta.'
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados da nova dieta",
            type: "object",
            schema: {
            die_nome: "Dieta de rotina",
            die_data: "2023-11-05",
            die_hora: "09:00:00",
            die_tipo: "Dieta balanceada",
            die_descricao: "Dieta para controle de peso",
            pac_id: 1
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Dieta criada com sucesso',
            schema: { $ref: "#/definitions/dietaCreate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de dieta ausentes ou inválidos',
            schema: { $ref: "#/definitions/dietaCreate400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/dietaCreate500" }
        } */

        try {
            const {
                die_nome,
                die_data,
                die_hora,
                die_tipo,
                die_descricao,
                pac_id,
            } = req.body

            await dietaSchema.validate(
                {
                  die_nome,
                  die_data,
                  die_hora,
                  die_tipo,
                  die_descricao,
                }
              );
            
            const dietaCreated = await Dietas.create({
                die_nome,
                die_data,
                die_hora,
                die_tipo,
                die_descricao,
                pac_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            return res.status(201).send(dietaCreated)

        } catch (error) {
            
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na criação da Dieta",
                    cause: error.message
                })
            }

            return res.status(500).send({
                message: "Ocorreu um erro desconhecido",
                cause: error.message
            })
        }
    }

    async findAllByPatient(req, res) {

        // #swagger.tags = ['Dietas']
        // #swagger.summary = 'Listar dietas por nome do paciente'
        // #swagger.description = 'Endpoint para listar dietas por nome do paciente.'
        /* #swagger.parameters['pac_nome'] = {in: 'path', type: 'string', description: 'Nome do paciente a ser buscado.'} */
        /* #swagger.responses[200] = { 
            description: 'Lista de dietas por nome do paciente',
            schema: { $ref: "#/definitions/dietaFindAllByPatient200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/dietaFindAllByPatient500" }
        } */

        try {
            const { pac_nome } = req.params
            const patientData = !pac_nome ? '' : await Pacientes.findAll({ where: {
                pac_nome: {
                    [Op.iLike]: `%${pac_nome}%`
                }
            }});
            
            const pac_id = patientData.length > 0 ? patientData.map(patient => patient.dataValues.pac_id) : null
            const dietas = pac_id
                ? await Dietas.findAll({ where: { pac_id: pac_id } })
                : await Dietas.findAll()

            return res.status(200).send({
                message: pac_id
                    ? `Dietas encontradas (${patientData.map(patient => patient.dataValues.pac_nome)})`
                    : 'Paciente não encontrado',
                data: dietas
            });

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar dietas",
                cause: error.message,
            });
        }
    }
  
    async update(req, res) {

        // #swagger.tags = ['Dietas']
        // #swagger.summary = 'Atualizar uma dieta'
        // #swagger.description = 'Endpoint para atualizar uma dieta por meio de seu ID.'
        /* #swagger.parameters['dietaId'] = {in: 'path', type: 'integer', description: 'ID da dieta a ser atualizada.'} */
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados de atualização da dieta",
            type: "object",
            schema: {
            die_nome: "Dieta atualizada",
            die_data: "2023-11-06",
            die_hora: "10:00:00",
            die_tipo: "Dieta modificada",
            die_descricao: "Dieta para controle de peso atualizada",
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Dieta atualizada com sucesso',
            schema: { $ref: "#/definitions/dietaUpdate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de dieta ausentes ou inválidos',
            schema: { $ref: "#/definitions/dietaUpdate400" }
        } */
        /* #swagger.responses[404] = { 
            description: 'Dieta não encontrada',
            schema: { $ref: "#/definitions/dietaUpdate404" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/dietaUpdate500" }
        } */

        try {    
          const { dietaId } = req.params;
          const dieta = await Dietas.findByPk(dietaId);
          if (!dieta) {
            return res.status(400).send({ message: "Dieta não encontrada." });
          }

          const { 
            die_nome,
            die_data,
            die_hora,
            die_tipo,
            die_descricao
          } = req.body;

          await dietaSchema.validate(
            {
              die_nome,
              die_data,
              die_hora,
              die_tipo,
              die_descricao,
            }
          );
    
          dieta.die_nome = die_nome
          dieta.die_data = die_data
          dieta.die_hora = die_hora
          dieta.die_tipo = die_tipo
          dieta.die_descricao = die_descricao
          dieta.updated_at = new Date()
    
          await dieta.save();
    
          return res
            .status(201)
            .send({ message: `Dieta '${die_nome}' atualizada com sucesso!` });
        } catch (error) {
            
          if (error.name === 'ValidationError') {
              return res.status(400).send({
                  message: "Erro na atualização da Dieta",
                  cause: error.message
              })
          }

          return res.status(500).send({
              message: "Ocorreu um erro desconhecido",
              cause: error.message
          })
        }
    }

    async remove(req, res) {

        // #swagger.tags = ['Dietas']
        // #swagger.summary = 'Remover uma dieta'
        // #swagger.description = 'Endpoint para remover uma dieta por meio de seu ID.'
        /* #swagger.parameters['dietaId'] = {in: 'path', type: 'integer', description: 'ID da dieta a ser removida.'} */
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados de confirmação para remover a dieta",
            type: "object",
            schema: {
            id: 2
            },
            required: true
        } */
        /* #swagger.responses[202] = { 
            description: 'Dieta removida com sucesso'
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de remoção ausentes ou inválidos',
            schema: { $ref: "#/definitions/dietaRemove400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/dietaRemove500" }
        } */

        try {
            const { dietaId } = req.params;

            const dieta = await Dietas.findByPk(dietaId);

            if (!dieta) {
              return res.status(400).send({message: "Dieta não encontrada."})
            };

            await dieta.destroy();
            dieta.die_status = false;
            await dieta.save();

            return res.status(202).send({message: "Dieta removida com sucesso."})
        } catch (error) {
            return res.status(500).send({
              message: "Erro ao remover dieta",
              cause: error.message
            });
        };
    }

    async findAllAdmin(req, res) {

        // #swagger.tags = ['Dietas']
        // #swagger.summary = 'Listar todas as dietas (Admin)'
        // #swagger.description = 'Endpoint para listar todas as dietas (Admin).'
        /* #swagger.responses[200] = { 
            description: 'Lista de todas as dietas',
            schema: { $ref: "#/definitions/dietaFindAllAdmin200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/dietaFindAllAdmin500" }
        } */

      try {
          const dietas = await Dietas.findAll({ paranoid: false })

          return res.status(200).send({ dietas });

      } catch (error) {
          return res.status(500).send({
              message: "Erro ao listar dietas",
              cause: error.message,
          });
      }
  }
}

module.exports = new DietaController()