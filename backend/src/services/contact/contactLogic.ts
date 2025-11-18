import { randomUUID } from 'crypto';
import { ContactSubmissionRequest, ContactSubmissionEntity, ContactStatus } from './contactTypes';

/**
 * @summary
 * In-memory storage for contact submissions
 */
const contactSubmissions: ContactSubmissionEntity[] = [];

/**
 * @summary
 * Creates a new contact submission and stores it in-memory.
 *
 * @function contactCreate
 * @module contact
 *
 * @param {ContactSubmissionRequest} data - The contact form data from the request.
 * @param {string} ip - The user's IP address.
 * @returns {Promise<ContactSubmissionEntity>} The created contact submission entity.
 */
export async function contactCreate(
  data: ContactSubmissionRequest,
  ip: string
): Promise<ContactSubmissionEntity> {
  const newSubmission: ContactSubmissionEntity = {
    ...data,
    id_contato: randomUUID(),
    data_envio: new Date(),
    ip_usuario: ip,
    status: ContactStatus.Novo,
    data_ultima_atualizacao: new Date(),
  };

  contactSubmissions.push(newSubmission);

  console.log('New contact submission:', newSubmission);

  return newSubmission;
}
