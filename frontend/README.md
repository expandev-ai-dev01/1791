# Catálogo de Carros

Listagem de carros, onde ao clicar no card consigo ver detalhes e preencher um formulário de contato.

## Tecnologias

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Tailwind CSS 4.1.17
- React Router DOM 7.9.6
- TanStack Query 5.90.2
- Zustand 5.0.8
- React Hook Form 7.66.1
- Zod 4.1.12

## Estrutura do Projeto

```
src/
├── assets/          # Estilos globais e recursos
├── core/            # Componentes e utilitários compartilhados
│   ├── components/  # Componentes UI reutilizáveis
│   ├── lib/         # Configurações de bibliotecas
│   ├── providers/   # Provedores de contexto
│   └── utils/       # Funções utilitárias
├── domain/          # Domínios de negócio
├── layouts/         # Layouts de página
├── pages/           # Páginas da aplicação
└── router/          # Configuração de rotas
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Configure as variáveis de ambiente conforme necessário

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Funcionalidades

- Listagem de carros com filtros e ordenação
- Visualização de detalhes do veículo
- Formulário de contato para manifestação de interesse