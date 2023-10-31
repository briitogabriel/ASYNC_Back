const yup = require('yup');

const consultaSchema = yup.object().shape({
  con_motivo: yup
    .string()
    .min(8, 'O motivo da consulta deve ter pelo menos 5 caracteres')
    .max(64, 'O motivo da consulta deve ter no máximo 64 caracteres')
    .required('O motivo da consulta é obrigatório'),

  con_data: yup.date().required('A data é obrigatória'),

  con_hora: yup.string().required('O horário é obrigatório'),

  con_descricao: yup
    .string()
    .min(16, 'A descrição do problema deve ter pelo menos 16 caracteres')
    .max(1024, 'A descrição do problema deve ter no máximo 1024 caracteres')
    .required('A descrição do problema é obrigatória'),

  con_medicacao: yup.string(),

  con_dosagem_precaucoes: yup
    .string()
    .min(16, 'A dosagem e precauções devem ter pelo menos 16 caracteres')
    .max(256, 'A dosagem e precauções devem ter no máximo 256 caracteres')
    .required('A dosagem e precauções é obrigatória'),

  con_status: yup
    .boolean()
});

module.exports = consultaSchema;