"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Permissoes", [
      { per_nome: 'Administrador', per_recursos: 'Admin', created_at: new Date(), updated_at: new Date(), },
      { per_nome: 'Médico', per_recursos: '_', created_at: new Date(), updated_at: new Date(), },      // VER COMO CLASSIFICAR OS RECURSOS E INSERIR
      { per_nome: 'Enfermeiro', per_recursos: '_', created_at: new Date(), updated_at: new Date(), },  // VER COMO CLASSIFICAR OS RECURSOS E INSERIR
      { per_nome: 'Paciente', per_recursos: '_', created_at: new Date(), updated_at: new Date(), },    // VER COMO CLASSIFICAR OS RECURSOS E INSERIR
    ]);

    const permissoes = await queryInterface.sequelize.query(
      `SELECT per_id FROM public."Permissoes";`
    );
    const permissoesRows = permissoes[0];   // Seleciona o ID = 1 (Admin)
    
    return await queryInterface.bulkInsert("Usuarios", [
      {
        usu_nome: "Admin",
        usu_genero: "M",
        usu_cpf: "000.000.000-00",
        usu_telefone: "(99) 9 9999-99999",
        usu_email: "admin@asynclab.com",
        usu_senha: "admin123",
        // usu_status: true,  // AUTOMÁTICO
        usu_campo_busca: "Admin | 000.000.000-00 | (99) 9 9999-99999 | admin@asynclab.com",  //  CONCATENAR OS CAMPOS "nome, cpf, telefone, e-mail"
        per_id: permissoesRows[0].per_id,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Permissoes", null, {});
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
