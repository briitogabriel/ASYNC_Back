const yup = require('yup');

const pacienteSchema = yup.object().shape({
  pac_nome: yup
    .string()
    .min(8, 'O nome do usuário deve ter pelo menos 5 caracteres')
    .max(64, 'O nome do usuário deve ter no máximo 64 caracteres')
    .required('O nome do usuário é obrigatório'),

  pac_genero: yup
    .string()
    .required('O gênero é obrigatório')
    .oneOf(['F', 'M']),

  pac_nascimento: yup
    .date()
    .required('A data de nascimento é obrigatória')
    .max(new Date(), 'A data de nascimento não é válida'),

  pac_cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),

  pac_rg: yup
    .string()
    .required('O RG é obrigatório')
    .matches(/^[A-Z]{2}-/, 'Formato de RG inválido'),

  pac_estado_civil: yup
    .string()
    .required('É obrigatório informar o estado civil')
    .oneOf(['Solteiro/a', 'Casado/a', 'Divorciado/a', 'Viúvo/a']),

  pac_telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^\(\d{2}\) \d \d{4}-\d{4}$/, 'Formato de telefone inválido'),

  pac_email: yup
    .string()
    .required('O email é obrigatório')
    .email('Email inválido'),

  pac_naturalidade: yup
    .string()
    .required('É obrigatório informar a naturalidade')
    .min(8, 'Naturalidade deve ter no mínimo 8 caracteres')
    .max(64, 'Naturalidade deve ter no máximo 64 caracteres'),

  pac_contato_emergencia: yup
    .string()
    .required('É obrigatório informar um contato de emergência')
    .matches(/^\(\d{2}\) \d \d{4}-\d{4}$/, 'Formato do contato de emergência inválido'),
  
  pac_alergias: yup.string(),

  pac_cuidados_especiais: yup.string(),

  pac_convenio: yup.string(),
 
  pac_numero_convenio: yup.string(),

  pac_validade_convenio: yup.string(),
    
  pac_status: yup
    .boolean()
    .default(true)
});

module.exports = pacienteSchema;
