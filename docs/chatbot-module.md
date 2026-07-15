# Módulo `(chatbot)`

## 1. Visão geral

O módulo de chatbot oferece uma tela única de perguntas em linguagem natural sobre medicamentos, respondida por IA. O usuário digita uma pergunta, envia, e a resposta do agente é transmitida via _streaming_ e exibida incrementalmente na tela. É acessado a partir da Home do módulo `(medication)` (FAB de chat → `/(chatbot)`).

Diferente do módulo `(medication)`, esta feature **não usa React Query nem service/axios**: o view-model fala direto com o backend `POST /ai-search` usando o Vercel AI SDK (`@ai-sdk/react` `useCompletion`) e `expo/fetch` para consumir o stream em nativo.

Capacidades:

- Enviar uma pergunta em linguagem natural (pt-BR) sobre medicamentos.
- Receber a resposta do agente de IA por streaming (aparece token a token).
- Estado de loading no botão de envio enquanto a resposta é gerada.

```
Rotas de acesso: /(chatbot)   (Home do chatbot — pergunta + resposta)
```

---

## 2. Estrutura de arquivos

```
app/
└── (chatbot)/
    └── index.tsx                         # Rota → ChatbotHomeScreen

features/chatbot/
├── screens/
│   └── home/
│       ├── Home.screen.tsx               # Tela (input + bolha de resposta)
│       └── styles.ts
└── effects/
    └── useChatbotHomeViewModel.tsx       # Lógica: useCompletion + streaming

polyfills.js                              # TextEncoder/DecoderStream + structuredClone (nativo)
```

> Não há `services/`, `state/` (React Query) nem `types/` dedicados ao módulo. Todo o acesso a dados vive no view-model via `useCompletion`.

---

## 3. API

> **Fonte de verdade dos contratos:** [`docs/api-reference.md`](./api-reference.md) — seção [AI Search](./api-reference.md#5-ai-search). Esta seção lista **apenas** o endpoint consumido e as particularidades do frontend.
>
> **Base URL (frontend):** `http://10.0.2.2:3000` (alias do emulador Android para o `localhost` do host), hardcoded em `features/chatbot/effects/useChatbotHomeViewModel.tsx`. O iOS Simulator **não** alcança `10.0.2.2`.

### Endpoints consumidos

| Endpoint          | Uso no módulo                                  | Contrato                                       |
| ----------------- | ---------------------------------------------- | ---------------------------------------------- |
| `POST /ai-search` | pergunta + resposta streaming (`useCompletion`) | [api-reference §5](./api-reference.md#5-ai-search) |

### `POST /ai-search` — Busca com IA (streaming)

**Body:** `{ "prompt": string }` — o `useCompletion` envia o texto do input como `prompt`.

**Response `200` — streaming:** texto transmitido como stream (`text/event-stream`), consumido incrementalmente. Internamente o modelo (`gpt-4.1-nano`) roda até 5 iterações de tool-call (`getMedications`) antes da resposta final. Ver [api-reference §5](./api-reference.md#5-ai-search).

### Particularidades do frontend

- **Streaming em nativo exige polyfills.** `polyfills.js` (importado em `app/_layout.tsx` via `@/polyfills`) instala `TextEncoderStream`/`TextDecoderStream` (`@stardazed/streams-text-encoding`) e `structuredClone` (`@ungap/structured-clone`) quando `Platform.OS !== "web"`. Sem eles o stream do AI SDK quebra fora da web.
- **`expo/fetch` obrigatório.** O `useCompletion` recebe `fetch: expoFetch` (cast para `typeof globalThis.fetch`) porque o `fetch` padrão do RN não suporta streaming de resposta.

---

## 4. Tipos

O módulo não define tipos próprios (DTOs/responses). A forma dos dados é a do hook `useCompletion` do `@ai-sdk/react`:

```typescript
// Retorno relevante de useCompletion (@ai-sdk/react)
{
  completion: string;              // resposta acumulada do agente (cresce durante o stream)
  input: string;                   // valor atual do campo de pergunta
  setInput: (value: string) => void;
  complete: (prompt: string) => Promise<...>; // dispara a requisição de streaming
  isLoading: boolean;              // true enquanto o stream está em andamento
}
```

---

## 5. Service

Não há camada de service. O view-model consome `POST /ai-search` diretamente através do `useCompletion`, configurado com:

```typescript
useCompletion({
  api: `${BASE_URL}/ai-search`,                        // BASE_URL = "http://10.0.2.2:3000"
  fetch: expoFetch as unknown as typeof globalThis.fetch,
});
```

---

## 6. ViewModels

### `useChatbotHomeViewModel`

**Arquivo:** `features/chatbot/effects/useChatbotHomeViewModel.tsx`

```typescript
interface ChatbotHomeViewModel {
  completion: string;              // resposta do agente (streaming)
  input: string;                   // texto digitado pelo usuário
  isLoading: boolean;              // stream em andamento
  shouldShowCompletion: boolean;   // true quando completion.length > 0
  setInput: (value: string) => void;
  onSendButtonPress: () => void;   // dispara complete(input)
}
```

**Comportamento:**

- Instancia `useCompletion` apontando para `${BASE_URL}/ai-search` com `expoFetch` (streaming em nativo).
- `shouldShowCompletion` deriva de `completion.length > 0` — controla a exibição da bolha de resposta.
- `onSendButtonPress` chama `complete(input)`, disparando a requisição de streaming com o texto atual.
- Reexpõe `completion`, `input`, `setInput` e `isLoading` do hook para a tela.

---

## 7. Rotas

### `/(chatbot)`

**Arquivo:** `app/(chatbot)/index.tsx` → `screens/home/Home.screen.tsx`

#### Layout

```
┌──────────────────────────────┐
│ title: "Perguntar para IA"    │  ← Stack.Screen
├──────────────────────────────┤
│ ┌──────────────────────────┐  │
│ │ Resposta do agente       │  │  ← bolha (só se shouldShowCompletion)
│ │ <texto em streaming...>  │  │
│ └──────────────────────────┘  │
│         (ScrollView)          │
├──────────────────────────────┤
│ [ Digite sua pergunta ____ ]  │  ← TextInput
│ [   Fazer Pergunta        ]   │  ← Button (loading enquanto isLoading)
└──────────────────────────────┘
```

#### Comportamento

- A bolha "Resposta do agente" só aparece quando há `completion` (`shouldShowCompletion`); o texto cresce token a token durante o stream.
- O botão "Fazer Pergunta" fica `disabled` e com `loading` enquanto `isLoading` (stream em andamento).
- O campo de input é controlado (`value={input}` / `onChangeText={setInput}`).
- Cores/estilo hardcoded na tela: botão `#FF5A5F` com texto branco (ver seção 8).

---

## 8. Regras de negócio

1. **Sem persistência / histórico:** a tela mantém apenas a última `completion`; enviar nova pergunta substitui a resposta. Não há histórico de conversa nem múltiplas mensagens.
2. **Streaming obrigatório em nativo:** depende de `polyfills.js` (`TextEncoderStream`/`TextDecoderStream`/`structuredClone`) e de `expo/fetch`. Sem esses, o stream não funciona fora da web.
3. **Backend obrigatório:** `BASE_URL = http://10.0.2.2:3000` (emulador Android). O iOS Simulator **não** alcança `10.0.2.2`.
4. **Envio sem validação:** `onSendButtonPress` dispara `complete(input)` mesmo com input vazio; não há checagem de string vazia.

### Pendências conhecidas (hardcoded / TODO)

- `BASE_URL` está duplicado (também existe em `services/medication.service.ts`) — não há config centralizada.
- Cor do botão (`#FF5A5F`) hardcoded na tela em vez de vir do tema do Paper.
- Sem tratamento de erro do stream (o `useCompletion` expõe `error`, mas o view-model não o consome).

---

## 9. Extensão futura

Para evoluir o módulo (ex: histórico de conversa, múltiplas mensagens, tratamento de erro):

1. Extrair `BASE_URL` para uma config compartilhada (evitar duplicação com `medication.service.ts`).
2. Se novos endpoints forem necessários, criar `services/chatbot.service.ts` seguindo o padrão do projeto (axios) — mantendo o streaming via `useCompletion`/`expo/fetch` quando aplicável.
3. Expandir o `useChatbotHomeViewModel` (ou criar novos view-models em `features/chatbot/effects/`) para estado adicional: histórico, `error`, validação de input.
4. Ajustar/criar telas em `features/chatbot/screens/` consumindo o view-model.
5. Adicionar a rota fina em `app/(chatbot)/` renderizando apenas a tela.
6. Atualizar este documento.
```