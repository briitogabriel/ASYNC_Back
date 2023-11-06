const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const exercicioSchema = require("../validations/exercicioValidation");
const Exercicios = require("../models/exercicios")(sequelize, Sequelize);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);
class ExercicioController {
    async create(req, res) {

        // #swagger.tags = ['Exercícios']
        // #swagger.summary = 'Criar um novo exercício'
        // #swagger.description = 'Endpoint para criar um novo exercício.'
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados do novo exercício",
            type: "object",
            schema: {
            exe_nome: "Nome do Exercício",
            exe_data: "Data do Exercício",
            exe_hora: "Hora do Exercício",
            exe_tipo: "Tipo do Exercício",
            exe_descricao: "Descrição do Exercício",
            exe_qtd: 1,
            pac_id: 1
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Exercício criado com sucesso',
            schema: { $ref: "#/definitions/exerciseCreate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de exercício ausentes ou inválidos',
            schema: { $ref: "#/definitions/exerciseCreate400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/exerciseCreate500" }
        } */

        try {
            const {
                exe_nome,
                exe_data,
                exe_hora,
                exe_tipo,
                exe_descricao,
                exe_qtd,
                pac_id,
            } = req.body

            await exercicioSchema.validate(
                {
                    exe_nome,
                    exe_data,
                    exe_hora,
                    exe_tipo,
                    exe_descricao,
                    exe_qtd,
                }
            );
                
            const exercicioCreated = await Exercicios.create({
                exe_nome,
                exe_data,
                exe_hora,
                exe_tipo,
                exe_descricao,
                exe_qtd,
                pac_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            return res.status(201).send(exercicioCreated)

        } catch (error) {
            
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na criação do Exercício",
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

        // #swagger.tags = ['Exercícios']
        // #swagger.summary = 'Listar exercícios de um paciente'
        // #swagger.description = 'Endpoint para listar exercícios de um paciente com base no nome do paciente.'
        /* #swagger.parameters['pac_nome'] = {in: 'path', type: 'string', description: 'Nome do paciente para pesquisa.'} */
        /* #swagger.responses[200] = { 
            description: 'Lista de exercícios do paciente',
            schema: { $ref: "#/definitions/exerciseFindAllByPatient200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/exerciseFindAllByPatient500" }
        } */

        try {
            const { pac_nome } = req.params
            const patientData = !pac_nome ? '' : await Pacientes.findAll({ where: {
                pac_nome: {
                    [Op.iLike]: `%${pac_nome}%`
                }
            }});
            
            const pac_id = patientData.length > 0 ? patientData.map(patient => patient.dataValues.pac_id) : null
            const exercicios = pac_id
                ? await Exercicios.findAll({ where: { pac_id: pac_id } })
                : await Exercicios.findAll()

            return res.status(200).send({
                message: pac_id
                    ? `Exercicios encontrados (${patientData.map(patient => patient.dataValues.pac_nome)})`
                    : 'Paciente não encontrado',
                data: exercicios
            });

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar exercicios",
                cause: error.message,
            });
        }
    }
  
    async update(req, res) {

        // #swagger.tags = ['Exercícios']
        // #swagger.summary = 'Atualizar um exercício'
        // #swagger.description = 'Endpoint para atualizar um exercício pelo ID.'
        /* #swagger.parameters['exercicioId'] = {in: 'path', type: 'integer', description: 'ID do exercício a ser atualizado.'} */
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados de atualização do exercício",
            type: "object",
            schema: {
            exe_nome: "Nome do Exercício Atualizado",
            exe_data: "Data do Exercício Atualizada",
            exe_hora: "Hora do Exercício Atualizada",
            exe_tipo: "Tipo do Exercício Atualizado",
            exe_descricao: "Descrição do Exercício Atualizada",
            exe_qtd: 2
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Exercício atualizado com sucesso',
            schema: { $ref: "#/definitions/exerciseUpdate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de exercício ausentes ou inválidos',
            schema: { $ref: "#/definitions/exerciseUpdate400" }
        } */
        /* #swagger.responses[404] = { 
            description: 'Exercício não encontrado',
            schema: { $ref: "#/definitions/exerciseUpdate404" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/exerciseUpdate500" }
        } */

        try {    
          const { exercicioId } = req.params;
          const exercicio = await Exercicios.findByPk(exercicioId);
          if (!exercicio) {
            return res.status(400).send({ message: "Exercicio não encontrado." });
          }

          const { 
            exe_nome,
            exe_data,
            exe_hora,
            exe_tipo,
            exe_descricao,
            exe_qtd,
          } = req.body;

          await exercicioSchema.validate(
            {
                exe_nome,
                exe_data,
                exe_hora,
                exe_tipo,
                exe_descricao,
                exe_qtd,
            }
          );
    
          exercicio.exe_nome = exe_nome
          exercicio.exe_data = exe_data
          exercicio.exe_hora = exe_hora
          exercicio.exe_tipo = exe_tipo
          exercicio.exe_descricao = exe_descricao
          exercicio.exe_qtd = exe_qtd
          exercicio.updated_at = new Date()
    
          await exercicio.save();
    
          return res
            .status(201)
            .send({ message: `Exercicio '${exe_nome}' atualizado com sucesso!` });
        } catch (error) {
            
          if (error.name === 'ValidationError') {
              return res.status(400).send({
                  message: "Erro na atualização do Exercicio",
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

        // #swagger.tags = ['Exercícios']
        // #swagger.summary = 'Remover um exercício'
        // #swagger.description = 'Endpoint para remover um exercício pelo ID.'
        /* #swagger.parameters['exercicioId'] = {in: 'path', type: 'integer', description: 'ID do exercício a ser removido.'} */
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados de confirmação para remover o exercício",
            type: "object",
            schema: {
            id: 2
            },
            required: true
        } */
        /* #swagger.responses[200] = { 
            description: 'Exercício removido com sucesso'
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de remoção ausentes ou inválidos',
            schema: { $ref: "#/definitions/exerciseRemove400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/exerciseRemove500" }
        } */

        try {
            const { exercicioId } = req.params;

            const exercicio = await Exercicios.findByPk(exercicioId);

            if (!exercicio) {
              return res.status(400).send({message: "Exercicio não encontrado."})
            };

            await exercicio.destroy();
            exercicio.exe_status = false;
            await exercicio.save();

            return res.status(202).send({message: "Exercicio removido com sucesso."})
        } catch (error) {
            return res.status(500).send({
              message: "Erro ao remover exercicio",
              cause: error.message
            });
        };
    }

    async findAllAdmin(req, res) {

        // #swagger.tags = ['Exercícios']
        // #swagger.summary = 'Listar todos os exercícios (Admin)'
        // #swagger.description = 'Endpoint para listar todos os exercícios cadastrados, incluindo os arquivados (Admin).'
        /* #swagger.responses[200] = { 
            description: 'Lista de todos os exercícios cadastrados (Admin)',
            schema: { $ref: "#/definitions/exerciseFindAllAdmin200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/exerciseFindAllAdmin500" }
        } */

      try {
          const exercicios = await exercicios.findAll({ paranoid: false })

          return res.status(200).send({ exercicios });

      } catch (error) {
          return res.status(500).send({
              message: "Erro ao listar exercicios",
              cause: error.message,
          });
      }
  }
}

module.exports = new ExercicioController()