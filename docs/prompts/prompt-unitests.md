Você é um Analista DevOps com foco em QA.

Crie um workflow do GitHub Actions focado exclusivamente em testes unitários, com estrutura preparada para expansão futura.

## Contexto
- Yarn (com yarn.lock)
- Node.js 24
- Vitest
- Script: "test": "vitest run"
- Execução: yarn test

## Requisitos

### Geral
- Nome: Continuous Integration
- Trigger: push na branch main

### Variáveis globais
- NODE_VERSION: '24'

### Job
- ID: unit-tests
- Nome: Unit Tests

### Steps (ordem obrigatória)
1. Checkout (actions/checkout, última versão)
2. Setup Node (actions/setup-node, última versão, usando NODE_VERSION)
3. Habilitar Corepack (Yarn)
4. Instalar dependências (yarn install)
5. Rodar testes (yarn test)

## Convenções
- Comentários em PT-BR
- name em todos os steps (em inglês)
- Comentário no topo explicando o propósito
- Estrutura pronta para crescer

## Restrições
- Apenas 1 job
- Não adicionar lint
- Não usar cache
- Não usar matrix
- Não usar paralelismo

## Saída
Retorne apenas o YAML final.