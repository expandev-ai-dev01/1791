import { z } from 'zod';

export const contactSchema = z.object({
  nome_completo: z
    .string({
      required_error: 'Nome completo é obrigatório',
    })
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres')
    .refine((name) => name.trim().split(' ').length >= 2, {
      message: 'Por favor, informe seu nome completo (nome e sobrenome)',
    }),
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email('Por favor, informe um endereço de e-mail válido')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres'),
  telefone: z
    .string({
      required_error: 'Telefone é obrigatório',
    })
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD'),
  preferencia_contato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
    required_error: 'Por favor, selecione sua preferência de contato',
  }),
  melhor_horario: z
    .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
    .optional()
    .default('Qualquer horário'),
  id_veiculo: z.string(),
  assunto: z.enum(
    [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ],
    { required_error: 'Por favor, selecione o assunto da sua consulta' }
  ),
  mensagem: z
    .string({
      required_error: 'Mensagem é obrigatória',
    })
    .min(10, 'A mensagem deve ter no mínimo 10 caracteres')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),
  financiamento: z.boolean().optional().default(false),
  termos_privacidade: z.literal(true, {
    errorMap: () => ({ message: 'É necessário concordar com os termos de privacidade' }),
  }),
  receber_novidades: z.boolean().optional().default(false),
});
