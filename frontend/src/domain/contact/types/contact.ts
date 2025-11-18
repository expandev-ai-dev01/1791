import type { z } from 'zod';
import type { contactSchema } from '../validations';

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactSubmissionResponse {
  id: string;
  protocolo: string;
  data_envio: string;
  [key: string]: any;
}
