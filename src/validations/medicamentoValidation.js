const yup = require('yup');

const medicamentoSchema = yup.object().shape({
  med_nome: yup
    .string()
    .min(5, 'O nome do medicamento deve ter pelo menos 5 caracteres')
    .max(100, 'O nome do medicamento deve ter no máximo 100 caracteres')
    .required('O nome do medicamento é obrigatório'),

  med_data: yup.date().required('A data é obrigatória'),

  med_hora: yup.string().required('A hora é obrigatória'),

  med_tipo: yup
  .string()
  .oneOf(
    ['Cápsula', 'Comprimido', 'Líquido', 'Creme', 'Gel', 'Inalação', 'Injeção', 'Spray'],
    'Tipo de dieta inválido'
  )
  .required('O tipo do medicamento é obrigatório'),

  med_descricao: yup
    .string()
    .max(1024, 'A descrição do medicamento deve ter no máximo 1024 caracteres'),

  med_qtd: yup.number().required('A quantidade é obrigatória'),

  med_unidade: yup
    .string()
    .oneOf(
      ['mg', 'mcg', 'g', 'mL', '%'],
      'Tipo de dieta inválido'
      )
    .required('A unidade do medicamento é obrigatória'),    

  med_observacoes: yup
    .string()
    .min(10, 'As observações do medicamento devem ter no mínimo 10 caracteres')
    .max(1000, 'As observações do medicamento devem ter no máximo 1000 caracteres'),

  pac_id: yup.number().required('O ID do paciente é obrigatório'),

  sistema_status: yup
  .boolean()
  .default(true),
});

module.exports = medicamentoSchema;
