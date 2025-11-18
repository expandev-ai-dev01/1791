import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services';
import type { ContactFormData } from '../../types';
import type { UseContactFormReturn } from './types';

export const useContactForm = (): UseContactFormReturn => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (data: ContactFormData) => contactService.submit(data),
  });

  return { mutate, ...rest };
};
