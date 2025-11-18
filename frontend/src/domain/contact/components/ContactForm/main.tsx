import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../../validations';
import { useContactForm } from '../../hooks';
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  Select,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/core/components';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { ContactFormProps } from './types';

const contactPreferenceOptions = [
  { value: 'E-mail', label: 'E-mail' },
  { value: 'Telefone', label: 'Telefone' },
  { value: 'WhatsApp', label: 'WhatsApp' },
];

const bestTimeOptions = [
  { value: 'Manhã', label: 'Manhã' },
  { value: 'Tarde', label: 'Tarde' },
  { value: 'Noite', label: 'Noite' },
  { value: 'Qualquer horário', label: 'Qualquer horário' },
];

const subjectOptions = [
  { value: 'Informações gerais', label: 'Informações gerais' },
  { value: 'Agendamento de test drive', label: 'Agendamento de test drive' },
  { value: 'Negociação de preço', label: 'Negociação de preço' },
  { value: 'Financiamento', label: 'Financiamento' },
  { value: 'Outro', label: 'Outro' },
];

export const ContactForm = ({ vehicleId, vehicleName }: ContactFormProps) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome_completo: '',
      email: '',
      telefone: '',
      preferencia_contato: undefined,
      melhor_horario: 'Qualquer horário',
      id_veiculo: vehicleId,
      assunto: undefined,
      mensagem: '',
      financiamento: false,
      termos_privacidade: false,
      receber_novidades: false,
    },
  });

  const { mutate, isPending, isSuccess, data, error } = useContactForm();

  const watchedSubject = form.watch('assunto');
  const watchedMessage = form.watch('mensagem');

  useEffect(() => {
    if (watchedSubject === 'Financiamento') {
      form.setValue('financiamento', true);
    } else {
      form.setValue('financiamento', false);
    }
  }, [watchedSubject, form]);

  const onSubmit = (values: ContactFormData) => {
    mutate(values);
  };

  if (isSuccess) {
    return (
      <div className="p-6 border rounded-sm bg-green-50 text-green-900 text-center">
        <h3 className="text-lg font-semibold mb-2">Contato enviado com sucesso!</h3>
        <p className="text-sm mb-2">Obrigado por seu interesse. Entraremos em contato em breve.</p>
        {data?.id && <p className="text-xs">Protocolo: {data.id}</p>}
      </div>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-1">Interessado neste veículo?</h3>
      <p className="text-muted-foreground mb-6">
        Preencha o formulário abaixo para entrarmos em contato.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nome_completo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone *</FormLabel>
                <FormControl>
                  <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferencia_contato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferência de Contato *</FormLabel>
                <FormControl>
                  <RadioGroup
                    options={contactPreferenceOptions}
                    {...field}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="melhor_horario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melhor Horário</FormLabel>
                <FormControl>
                  <Select options={bestTimeOptions} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto *</FormLabel>
                <FormControl>
                  <Select options={subjectOptions} placeholder="Selecione um assunto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mensagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Digite sua mensagem aqui..." {...field} rows={5} />
                </FormControl>
                <div className="text-right text-xs text-muted-foreground">
                  {watchedMessage?.length || 0} / 1000
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="financiamento"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={watchedSubject === 'Financiamento'}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Tenho interesse em financiamento</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receber_novidades"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Quero receber novidades e promoções por e-mail</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termos_privacidade"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Li e concordo com os{' '}
                    <a href="/privacy" target="_blank" className="underline text-primary-500">
                      termos de privacidade
                    </a>{' '}
                    *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {error && (
            <div className="p-3 rounded-sm bg-red-50 text-red-700 text-sm">
              Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <LoadingSpinner size="sm" /> : 'Enviar Contato'}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
