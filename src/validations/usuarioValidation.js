const yup = require('yup');

const usuarioSchema = yup.object().shape({
  usu_nome: yup
    .string()
    .min(8, 'O nome do usuário deve ter pelo menos 5 caracteres')
    .max(64, 'O nome do usuário deve ter no máximo 64 caracteres')
    .required('O nome do usuário é obrigatório'),

  usu_genero: yup
    .string()
    .required('O gênero é obrigatório')
    .oneOf(['F', 'M']),

  usu_cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),

  usu_telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^\(\d{2}\) \d \d{4}-\d{4}$/, 'Formato de telefone inválido'),

  usu_email: yup
    .string()
    .required('O email é obrigatório')
    .email('Email inválido'),

  usu_senha: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),

  usu_status: yup
    .boolean()
    .default(true)
});

module.exports = usuarioSchema;
