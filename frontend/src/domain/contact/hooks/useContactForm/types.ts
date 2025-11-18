import type { UseMutationResult } from '@tanstack/react-query';
import type { ContactFormData, ContactSubmissionResponse } from '../../types';

export type UseContactFormReturn = UseMutationResult<
  ContactSubmissionResponse,
  Error,
  ContactFormData,
  unknown
>;
