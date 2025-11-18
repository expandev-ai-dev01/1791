/**
 * @enum ContactPreference
 * @description Preferred contact methods
 */
export enum ContactPreference {
  Telefone = 'Telefone',
  Email = 'E-mail',
  WhatsApp = 'WhatsApp',
}

/**
 * @enum ContactTime
 * @description Preferred contact times
 */
export enum ContactTime {
  Manha = 'Manhã',
  Tarde = 'Tarde',
  Noite = 'Noite',
  Qualquer = 'Qualquer horário',
}

/**
 * @enum ContactSubject
 * @description Subjects for the contact inquiry
 */
export enum ContactSubject {
  InformacoesGerais = 'Informações gerais',
  AgendamentoTestDrive = 'Agendamento de test drive',
  NegociacaoPreco = 'Negociação de preço',
  Financiamento = 'Financiamento',
  Outro = 'Outro',
}

/**
 * @enum ContactStatus
 * @description Status of the contact submission in the system
 */
export enum ContactStatus {
  Novo = 'Novo',
  EmAtendimento = 'Em atendimento',
  Concluido = 'Concluído',
  Cancelado = 'Cancelado',
}

/**
 * @interface ContactSubmissionRequest
 * @description Represents the data received from the contact form.
 */
export interface ContactSubmissionRequest {
  nome_completo: string;
  email: string;
  telefone: string;
  preferencia_contato: ContactPreference;
  melhor_horario?: ContactTime;
  id_veiculo: string;
  assunto: ContactSubject;
  mensagem: string;
  financiamento?: boolean;
  termos_privacidade: boolean;
  receber_novidades?: boolean;
}

/**
 * @interface ContactSubmissionEntity
 * @description Represents the full contact submission entity as stored in the system.
 */
export interface ContactSubmissionEntity extends ContactSubmissionRequest {
  id_contato: string;
  data_envio: Date;
  ip_usuario: string;
  status: ContactStatus;
  consultor_responsavel?: string;
  data_ultima_atualizacao: Date;
  notas_atendimento?: string;
}
