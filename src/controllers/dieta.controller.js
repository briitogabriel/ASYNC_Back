const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);
const Dietas = require('../models/Dietas')(sequelize, Sequelize);

const tipos_dieta = ['Low Carb', 'Dash', 'Paleolítica', 'Cetogênica', 'Dukan', 'Mediterrânea', 'Outra']
class DietaController {
    async create(req, res) {
        try {
            const {
                die_nome,
                die_data,
                die_hora,
                die_tipo,
                die_descricao,
                pac_id,
            } = req.body

            if (
                die_nome.length >= 4
                && die_nome.length <= 100
                && die_data
                && die_hora
                && tipos_dieta.includes(die_tipo)
                && die_descricao
                && pac_id > 0
            ) 
            {
                console.log(true)
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
            }
            
            console.log(false)
            return res.status(400).send({
                message: "Preencha os campos obrigatórios"
            })

        } catch (error) {
            return res.status(500).send({
                message: "Erro na criação da Dieta",
                cause: error//.message
            })
        }
    }
}

module.exports = new DietaController()