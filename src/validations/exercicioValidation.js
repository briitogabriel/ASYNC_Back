const yup = require('yup');

const exercicioSchema = yup.object().shape({
  exe_nome: yup
    .string()
    .required('Nome da Série de Exercícios é obrigatório')
    .min(5, 'Nome deve ter pelo menos 5 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres'),
  
  exe_data: yup.date().required('Data é obrigatória'),

  exe_hora: yup
    .string()
    .required('Horário é obrigatório'),

  exe_tipo: yup
    .string()
    .required('Tipo é obrigatório')
    .oneOf(
      ['Resistência Aeróbica', 'Resistência Muscular', 'Flexibilidade', 'Força', 'Agilidade', 'Outro'],
      'Tipo de exercício inválido'
    ),
  
  exe_qtd: yup
    .number()
    .required('Quantidade é obrigatória')
    .positive('Quantidade deve ser um número positivo')
    .test('decimal', 'Deve ter no mínimo duas casas após a vírgula', value => (value * 100) % 1 === 0),

  exe_descricao: yup
    .string()
    .required('Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(1000, 'Descrição não pode exceder 1000 caracteres'),
});

module.exports = exercicioSchema;
