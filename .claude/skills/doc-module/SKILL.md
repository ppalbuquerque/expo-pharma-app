---
name: doc-module
description: Escreve ou atualiza a documentação de um módulo do projeto seguindo o template padrão de docs/
---

Você deve produzir ou atualizar a documentação de um módulo seguindo rigorosamente o template abaixo. O arquivo de destino é `docs/<nome-do-módulo>-module.md`.

## Template obrigatório

### 1. Visão geral

Parágrafo curto descrevendo o módulo + lista de bullet points com as capacidades disponíveis.

```
**Rotas de acesso:** `/rota/list` (atalho `FN`), `/rota/:id`, etc.
```

---

### 2. Estrutura de arquivos

Árvore de diretórios em bloco de código mostrando apenas os artefatos do módulo:

```
src/renderer/src/
├── services/<módulo>/
│   ├── <módulo>.service.ts
│   ├── <módulo>.dto.ts
│   └── <módulo>.query.keys.ts
├── effects/<módulo>/
│   └── use<Feature>.viewmodel.ts
├── components/<módulo>/
│   └── <componente>.tsx          # se houver
└── routes/<módulo>/
    └── <rota>.tsx
```

---

### 3. API

> Fonte de verdade: `docs/api-reference.md`. Documente apenas os endpoints consumidos pelo módulo.

Por endpoint, use este formato:

```
### `MÉTODO /caminho` — Descrição curta

**Query/Path params:** tabela com Param | Tipo | Padrão | Descrição (omitir se não houver)

**Body:** tipo ou objeto (omitir se não houver)

**Response `200`:**
\`\`\`json
{ /* estrutura resumida */ }
\`\`\`

**Response `4xx`:** descrição (omitir se não houver casos relevantes)
```

---

### 4. Tipos

Interfaces TypeScript relevantes com comentários inline onde necessário.

- Valores monetários: sempre documentar como inteiro em centavos com exemplo — `// Inteiro em centavos (ex: 4800 = R$ 48,00)`
- Incluir: DTOs de request/response, tipos internos canônicos
- Omitir: tipos legados a menos que sejam usados ativamente

---

### 5. Service

Assinaturas dos métodos estáticos, sem corpo:

```typescript
class <Módulo>Service {
  static async metodo(params: TipoParams): Promise<TipoRetorno>
}
```

---

### 6. Query Keys

```typescript
MÓDULO_QUERY_KEYS = {
  CHAVE: 'valor-string',
}
```

---

### 7. ViewModels

Por viewmodel:

```
### `use<Feature>ViewModel`
**Arquivo:** `effects/<módulo>/use<Feature>.viewmodel.ts`

\`\`\`typescript
interface <Feature>ViewModel {
  // propriedades expostas ao componente
}
\`\`\`

**Comportamento:**
- Bullet points descrevendo lógica de negócio, efeitos colaterais, navegação, validação
```

---

### 8. Componentes (se houver)

Tabela de props ou colunas do componente dedicado ao módulo:

| Coluna/Prop | Campo | Observação |
|-------------|-------|------------|

---

### 9. Rotas

Por rota:

```
### `/rota/caminho`
**Arquivo:** `routes/<módulo>/<arquivo>.tsx`

#### Layout
\`\`\`
[ Bloco ASCII mostrando a estrutura visual da rota ]
\`\`\`

#### Comportamento
- Bullets descrevendo interações, estados de loading/erro, navegação por teclado
```

---

### 10. Regras de negócio

Lista numerada de invariantes e regras do domínio que o código deve respeitar.

---

### 11. Extensão futura

Lista numerada dos passos para adicionar novos casos de uso ao módulo:

1. Adicionar método em `<módulo>.service.ts`
2. Adicionar tipos em `<módulo>.dto.ts`
3. Adicionar query key se necessário
4. Criar viewmodel em `effects/<módulo>/`
5. Criar rota em `routes/<módulo>/`
6. Atualizar este documento

---

## Regras de escrita

- **Não duplicar código** — documente apenas assinaturas, interfaces e exemplos de JSON resumidos
- **Endpoints:** sempre referenciar `docs/api-reference.md` como fonte de verdade
- **Valores monetários:** sempre explicitar que são inteiros em centavos com exemplo numérico
- **Seções opcionais:** omita seções que não se aplicam ao módulo (ex: Query Keys se não usar React Query)
- **Idioma:** português para texto corrido; inglês para nomes de tipos, métodos e propriedades de código
