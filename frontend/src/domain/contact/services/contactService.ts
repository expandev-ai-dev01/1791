import { authenticatedClient } from '@/core/lib/api';
import type { ContactFormData, ContactSubmissionResponse } from '../types';

export const contactService = {
  async submit(data: ContactFormData): Promise<ContactSubmissionResponse> {
    const response = await authenticatedClient.post('/contact', data);
    return response.data.data;
  },
};
