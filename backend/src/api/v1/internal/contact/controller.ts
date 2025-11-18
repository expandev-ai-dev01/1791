import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, createError } from '@/middleware';
import { contactCreate, ContactPreference, ContactTime, ContactSubject } from '@/services/contact';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {post} /api/v1/internal/contact Submit Contact Form
 * @apiName SubmitContactForm
 * @apiGroup Contact
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits the contact form with user and vehicle interest data.
 *
 * @apiBody {String} nome_completo User's full name.
 * @apiBody {String} email User's email address.
 * @apiBody {String} telefone User's phone number.
 * @apiBody {String} preferencia_contato Preferred contact method ('Telefone', 'E-mail', 'WhatsApp').
 * @apiBody {String} [melhor_horario] Preferred contact time ('Manhã', 'Tarde', 'Noite', 'Qualquer horário').
 * @apiBody {String} id_veiculo ID of the vehicle of interest.
 * @apiBody {String} assunto Subject of the inquiry.
 * @apiBody {String} mensagem Detailed message.
 * @apiBody {Boolean} [financiamento] Interest in financing.
 * @apiBody {Boolean} termos_privacidade Agreement to privacy policy (must be true).
 * @apiBody {Boolean} [receber_novidades] Opt-in for news.
 *
 * @apiSuccess {Object} contactSubmission The created contact submission record.
 *
 * @apiError {String} ValidationError Invalid parameters provided.
 * @apiError {String} ServerError Internal server error.
 */
const bodySchema = z.object({
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
    .email('Por favor, informe um endereço de e-mail válido no formato usuario@dominio.com')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres'),
  telefone: z
    .string({
      required_error: 'Telefone é obrigatório',
    })
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD'),
  preferencia_contato: z.nativeEnum(ContactPreference, {
    required_error: 'Por favor, selecione sua preferência de contato',
  }),
  melhor_horario: z.nativeEnum(ContactTime).optional().default(ContactTime.Qualquer),
  id_veiculo: z.string({ required_error: 'ID do veículo é obrigatório' }),
  assunto: z.nativeEnum(ContactSubject, {
    required_error: 'Por favor, selecione o assunto da sua consulta',
  }),
  mensagem: z
    .string({
      required_error: 'Mensagem é obrigatória',
    })
    .min(10, 'Por favor, forneça mais detalhes em sua mensagem (mínimo 10 caracteres)')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),
  financiamento: z.boolean().optional().default(false),
  termos_privacidade: z.literal(true, {
    errorMap: () => ({
      message: 'É necessário concordar com os termos de privacidade para prosseguir',
    }),
  }),
  receber_novidades: z.boolean().optional().default(false),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body
     */
    const validatedBody = bodySchema.parse(req.body);

    /**
     * @rule {fn-contact-submission} Create contact submission record
     */
    const data = await contactCreate(validatedBody, req.ip ?? 'unknown');

    res.status(HTTP_STATUS.CREATED).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return next(
        createError('invalidRequestBody', HTTP_STATUS.BAD_REQUEST, 'VALIDATION_ERROR', error.errors)
      );
    }
    next(error);
  }
}
