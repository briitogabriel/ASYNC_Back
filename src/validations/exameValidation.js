const yup = require('yup');

const exameSchema = yup.object().shape({
  exa_nome: yup
    .string()
    .min(8, 'O nome do exame deve ter pelo menos 8 caracteres')
    .max(64, 'O nome do exame deve ter no máximo 64 caracteres')
    .required('O nome do exame é obrigatório'),

  exa_data: yup.date().required('A data é obrigatória'),

  exa_hora: yup.string().required('O horário é obrigatório'),

  exa_tipo: yup
    .string()
    .min(4, 'O tipo do exame deve ter pelo menos 4 caracteres')
    .max(32, 'O tipo do exame deve ter no máximo 32 caracteres')
    .required('O tipo do exame é obrigatório'),

  exa_laboratorio: yup
    .string()
    .min(4, 'O nome do laboratório deve ter pelo menos 4 caracteres')
    .max(32, 'O nome do laboratório deve ter no máximo 32 caracteres')
    .required('O laboratório é obrigatório'),

  exa_url_documento: yup.string(),

  exa_resultados: yup
    .string()
    .min(16, 'Os resultados devem ter pelo menos 16 caracteres')
    .max(1024, 'Os resultados devem ter no máximo 1024 caracteres')
    .required('Os resultados são obrigatórios'),
});

module.exports = exameSchema;
