const yup = require('yup');

const dietaSchema = yup.object().shape({
  die_nome: yup
    .string()
    .min(5, 'O nome da dieta deve ter pelo menos 5 caracteres')
    .max(100, 'O nome da dieta deve ter no máximo 100 caracteres')
    .required('O nome da dieta é obrigatório'),

  die_data: yup.date().required('A data é obrigatória'),

  die_hora: yup.string().required('O horário é obrigatório'),

  die_tipo: yup
    .string()
    .oneOf(
      ['Low Carb', 'Dash', 'Paleolítica', 'Cetogênica', 'Dukan', 'Mediterrânea', 'Outra'],
      'Tipo de dieta inválido'
    )
    .required('O tipo da dieta é obrigatório'),

  die_descricao: yup.string(),

});

module.exports = dietaSchema;
