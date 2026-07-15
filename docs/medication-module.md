# Módulo `(medication)`

## 1. Visão geral

O módulo de medicação é o núcleo do app: lista, busca, cadastro, detalhe, edição e exclusão de medicamentos da farmácia. É a feature de entrada (`app/index.tsx` renderiza a Home do módulo). Segue o padrão feature-sliced/MVVM do projeto: rotas finas em `app/`, telas em `features/medicines/screens/`, lógica em `effects/` (view-models), acesso a dados em `state/` (React Query) e chamadas HTTP em `services/`.

Capacidades:

- Listar medicamentos com paginação infinita (5 por página) e _pull-to-refresh_.
- Buscar por nome, composto químico ou função (busca com _debounce_).
- Cadastrar novo medicamento com upload de foto.
- Ver detalhe completo de um medicamento.
- Editar um medicamento existente (com atualização opcional da foto).
- Excluir um medicamento (com diálogo de confirmação).

```
Rotas de acesso: /                       (Home — lista + busca)
                 /(medication)/register  (cadastro)
                 /(medication)/[id]       (detalhe)
                 /(medication)/(edit)/[id] (edição)
```

---

## 2. Estrutura de arquivos

```
app/
├── index.tsx                              # Rota raiz → HomeScreen
└── (medication)/
    ├── register.tsx                       # Rota → MedicationRegisterScreen
    ├── [id].tsx                           # Rota → MedicationDetailScreen
    └── (edit)/
        └── [id].tsx                       # Rota → MedicationEditScreen

features/medicines/
├── screens/
│   ├── home/
│   │   ├── Home.screen.tsx
│   │   └── styles.ts
│   ├── medicationRegister/
│   │   ├── MedicationRegister.screen.tsx
│   │   └── styles.ts
│   ├── medicationDetail/
│   │   ├── MedicationDetail.screen.tsx
│   │   ├── styles.ts
│   │   └── sections/
│   │       ├── GeneralInfo.section.tsx
│   │       ├── MedicationInformation.section.tsx
│   │       └── QuickActions.section.tsx
│   └── editMedication/
│       ├── MedicationEdit.screen.tsx
│       └── styles.ts
├── effects/
│   ├── useHomeViewModel.tsx
│   ├── useMedicationDetailViewModel.tsx
│   ├── useMedicationRegisterViewModel.tsx
│   └── useMedicationEditViewModel.tsx
├── state/
│   ├── medication.model.ts                # Hook com todas as queries/mutations
│   └── medication.queries.key.ts          # Query keys centralizadas
├── forms/
│   ├── create-medication-form.schema.ts   # Schema yup + tipo do formulário
│   ├── medication.form.tsx                # Formulário compartilhado (cadastro/edição)
│   └── styles.ts
└── components/
    ├── HomeHeader/
    ├── MedicationList/                     # index.tsx + useMedicationList.tsx
    ├── MedicationCard/
    ├── MedicineCoverImage/
    └── PriceBox/

services/
├── medication.service.ts                  # CRUD + busca (axios)
└── files.service.ts                       # Upload de foto (multipart)

types/
├── medication.types.d.ts                  # type Medication
├── dto/
│   ├── create-medication-dto.type.d.ts
│   └── update-medication-dto.type.d.ts
└── responses/
    └── getMedicationResponse.type.d.ts
```

---

## 3. API

> **Fonte de verdade dos contratos:** [`docs/api-reference.md`](./api-reference.md) — seções [Medication](./api-reference.md#3-medication) e [Files](./api-reference.md#4-files) (params, bodies, responses, códigos e erros). Esta seção lista **apenas** os endpoints consumidos pelo módulo e as particularidades do frontend.
>
> **Base URL (frontend):** `http://10.0.2.2:3000` (alias do emulador Android para o `localhost` do host), hardcoded em `services/medication.service.ts` e `services/files.service.ts`. O iOS Simulator **não** alcança `10.0.2.2`.

### Endpoints consumidos

| Endpoint                          | Uso no módulo                                | Contrato                                    |
| --------------------------------- | -------------------------------------------- | ------------------------------------------- |
| `GET /medication?limit=&offset=`  | lista paginada (`useGetMedications`)         | [api-reference §3](./api-reference.md#3-medication) |
| `GET /medication/search?q=`       | busca (`useSearchMedications`)               | [§3](./api-reference.md#3-medication)       |
| `GET /medication/:id`             | detalhe (`useGetMedicationById`)             | [§3](./api-reference.md#3-medication)       |
| `POST /medication`                | cadastro (`createMedication`)                | [§3](./api-reference.md#3-medication)       |
| `PUT /medication`                 | edição (`updateMedication`)                  | [§3](./api-reference.md#3-medication)       |
| `DELETE /medication/:id`          | exclusão (`deleteMedication`)                | [§3](./api-reference.md#3-medication)       |
| `POST /files`                     | upload de foto (`useUploadFile`)             | [§4](./api-reference.md#4-files)            |

### Particularidades / divergências do frontend

Pontos onde o código do módulo diverge ou assume algo além do contrato — resolver ao alinhar com o backend:

- **`limit` default do módulo = 5** (`GET_MEDICATIONS_LIMIT`); o contrato usa default `10`.
- **Shape da lista:** `useGetMedications`/`MedicationService.getAllMedications` esperam `{ medications: Medication[]; nextPage: number | null }`, mas o contrato (§3) documenta `GET /medication` retornando **array puro** de `Medication`. O service faz `return response.data` sem transformar (há `TODO` de mapeamento) — validar o retorno real do backend.
- **Tipos de preço/`id`:** os tipos locais (`Medication`, `GetMedicationResponse`) tratam `id` como `number` e `boxPrice`/`unitPrice` ora como `number`, ora como `string`. O contrato (Schema Medication) define `id` como **UUID (string)** e preços como **inteiros em centavos** (ex: `4800 = R$ 48,00`). Ver seção 4.
- **Campos do contrato não modelados no frontend:** `boxAmount`, `fullTextSearch`, `createdAt`/`updatedAt` existem no Schema Medication mas não em `type Medication`.
- **Upload:** `POST /files` responde com `{ url, ... }` (§4); o módulo usa apenas `url` como `samplePhotoUrl`.

---

## 4. Tipos

```typescript
// types/medication.types.d.ts
// Tipo canônico usado na lista e busca.
export type Medication = {
  id: number;
  name: string;
  chemicalComposition: string;
  dosageInstructions: string;
  shelfLocation: string;
  usefulness: string;
  samplePhotoUrl: string;
  stockAvailability: number;
  boxPrice: number; // numérico na lista/busca
  unitPrice: number; // numérico na lista/busca
};
```

```typescript
// types/responses/getMedicationResponse.type.d.ts
// Resposta do detalhe (GET /medication/:id). Preços vêm como STRING aqui.
export type GetMedicationResponse = {
  id: number;
  name: string;
  chemicalComposition: string;
  dosageInstructions: string;
  shelfLocation: string;
  usefulness: string;
  samplePhotoUrl: string;
  stockAvailability: number;
  boxPrice: string; // string neste endpoint
  unitPrice: string; // string neste endpoint
  createdAt: string;
  updateAt: string;
};
```

```typescript
// types/dto/create-medication-dto.type.d.ts
export type CreateMedicationDTO = {
  name: string;
  chemicalComposition: string;
  dosageInstructions: string;
  shelfLocation: string;
  unitPrice: number;
  usefulness: string;
  stockAvailability: number;
  samplePhotoUrl: string;
  boxPrice?: number; // opcional no DTO
};

// types/dto/update-medication-dto.type.d.ts
export type UpdateMedicationDTO = Partial<CreateMedicationDTO>;
```

```typescript
// features/medicines/forms/create-medication-form.schema.ts
// Tipo do formulário (cadastro e edição), inferido do schema yup.
// Todos os campos são required no formulário — inclusive boxPrice.
export type CreateMedicationForm = {
  name: string;
  chemicalComposition: string;
  dosageInstructions: string;
  shelfLocation: string;
  boxPrice: number;
  unitPrice: number;
  usefulness: string;
  stockAvailability: number;
  samplePhotoUrl: string;
};
```

> **Preços:** o contrato define `boxPrice`/`unitPrice` como **inteiros em centavos** (ex: `4800 = R$ 48,00`) — ver [Schema Medication](./api-reference.md#3-medication). Os tipos locais estão desalinhados (`number` na lista, `string` no detalhe); a UI usa o `CurrencyInput` compartilhado para entrada. Alinhar os tipos ao contrato (inteiro em centavos).

---

## 5. Service

```typescript
// services/medication.service.ts
class MedicationService {
  static async getAllMedications(
    limit?: number,
    offset?: number
  ): Promise<{ medications: Medication[]; nextPage: number | null }>;

  static async search(query: string): Promise<Medication[]>;

  static async getMedicationDetail(
    medicationId: string
  ): Promise<GetMedicationResponse>;

  static async createMedication(data: CreateMedicationDTO): Promise<void>;

  static async updateMedication(data: UpdateMedicationDTO): Promise<void>;

  static async deleteMedication(medicationId: string): Promise<void>;
}
```

```typescript
// services/files.service.ts
class FileService {
  static async uploadFile(data: FormData): Promise<AxiosResponse>; // multipart/form-data
}
```

---

## 6. Query Keys

```typescript
// features/medicines/state/medication.queries.key.ts
MEDICATION_QUERY_KEYS = {
  LIST_MEDICATIONS: "list-medications",
  MEDICATION_DETAIL: "medication-detail",
  MEDICATION_SEARCH: "medication-search",
};
```

**Invalidação** (em `state/medication.model.ts`):

- `createMedication` → invalida `LIST_MEDICATIONS`.
- `updateMedication` → invalida `LIST_MEDICATIONS` **e** `MEDICATION_DETAIL`.
- `deleteMedication` → invalida `LIST_MEDICATIONS`.

`useGetMedications` usa `useInfiniteQuery` com `getNextPageParam: (lastPage) => lastPage.nextPage`.

---

## 7. ViewModels

### `useHomeViewModel`

**Arquivo:** `effects/useHomeViewModel.tsx`

```typescript
interface HomeViewModel {
  searchValue: string;
  medicationList: Medication[] | undefined;
  isLoadingMedications: boolean;
  isMedicationListEmpty: boolean;
  isFetchingNextPage: boolean;
  setSearchValue: (v: string) => void;
  handleOnSearchInputChange: (term: string) => void;
  refetchMedications: () => void;
  fetchMoreMedications: () => void;
}
```

**Comportamento:**

- Mantém `searchValue`; aplica `useDebounce` antes de disparar a busca.
- Quando o termo com debounce tem tamanho `> 0`, exibe o resultado da busca; caso contrário, achata as páginas do `useInfiniteQuery`.
- `isLoadingMedications` combina loading da lista e fetching da busca.
- `isMedicationListEmpty` só é `true` fora de loading e com lista vazia.
- `fetchMoreMedications` só avança se `hasNextPage && !isFetchingNextPage`.

### `useMedicationDetailViewModel`

**Arquivo:** `effects/useMedicationDetailViewModel.tsx`

```typescript
interface MedicationDetailViewModel {
  medication: GetMedicationResponse | undefined;
  getMedicationLoading: boolean;
  isDeleteDialogOpen: boolean;
  deleteMedicationLoading: boolean;
  handleDeleteMedicationToggle: () => void;
  handleDeleteMedication: () => Promise<void>;
  onEditMedicationPress: () => void;
}
```

**Comportamento:**

- Lê o `id` da rota via `useLocalSearchParams`.
- Busca o detalhe com `useGetMedicationById(id)`.
- `handleDeleteMedicationToggle` abre/fecha o diálogo de confirmação.
- `handleDeleteMedication` chama a mutation e, no sucesso, faz `router.back()`.
- `onEditMedicationPress` navega para `/(medication)/(edit)/[id]`.

### `useMedicationRegisterViewModel`

**Arquivo:** `effects/useMedicationRegisterViewModel.tsx`

```typescript
interface MedicationRegisterViewModel {
  control: Control<CreateMedicationForm>;
  formErrors: FieldErrors<CreateMedicationForm>;
  isFormValid: boolean;
  createMedicationLoading: boolean;
  handleFormSubmit: () => void;
  onPhotoTaken: (photo: ImagePickerResult) => Promise<void>;
  onCancelPress: () => void;
}
```

**Comportamento:**

- `react-hook-form` + `yupResolver(createMedicationFormSchema)`.
- `onPhotoTaken` guarda o asset em `photoRef` e seta `samplePhotoUrl` (com validação).
- `handleFormSubmit`: **exige foto** (só submete se `photoRef.current` existe) → faz upload via `useUploadFile` → cria o medicamento com a `url` retornada.
- Sucesso: toast + `router.back()` após 1500ms. Erro: toast de erro.
- `createMedicationLoading` = mutation de criar **ou** upload pendente.

### `useMedicationEditViewModel`

**Arquivo:** `effects/useMedicationEditViewModel.tsx`

```typescript
interface MedicationEditViewModel {
  control: Control<CreateMedicationForm>;
  formErrors: FieldErrors<CreateMedicationForm>;
  isFormValid: boolean;
  createMedicationLoading: boolean;
  handleFormSubmit: () => void;
  onPhotoTaken: (photo: ImagePickerResult) => Promise<void>;
  onCancelPress: () => void;
}
```

**Comportamento:**

- Lê o `id` da rota; carrega os dados com `useGetMedicationById` e injeta no form via `values: data` (preenchimento automático).
- Rastreia `isPhotoUpdated` — só faz upload se a foto foi trocada; senão reaproveita a `samplePhotoUrl` existente.
- `handleFormSubmit` chama `updateMedication.mutateAsync`.
- Sucesso: toast + `router.back()` após 1500ms. Erro: toast de erro.

---

## 8. Componentes

### `MedicationList` (`components/MedicationList/`)

Renderiza a `FlatList` de medicamentos com refresh e paginação. Cada item é um `Link` para `/(medication)/[id]`.

| Prop                  | Tipo                    | Observação                                    |
| --------------------- | ----------------------- | --------------------------------------------- |
| `medicationList`      | `Medication[] \| undefined` | Dados a exibir                            |
| `onRefreshList`       | `() => void`            | Pull-to-refresh                               |
| `fetchMoreMedications`| `() => void`            | Chamado em `onEndReached`                     |
| `isLoading`           | `boolean`               | Mostra `ActivityIndicator` no lugar da lista  |
| `isFetchingMore`      | `boolean`               | Spinner no rodapé ao paginar                  |

O hook interno `useMedicationList` controla `isRefreshing` e expõe `onRefresh`/`onEndReached`.

### `MedicationCard` (`components/MedicationCard/`)

Card de item da lista.

| Prop                  | Tipo     | Observação                                       |
| --------------------- | -------- | ------------------------------------------------ |
| `medicationTitle`     | `string` | Nome do medicamento                              |
| `chemicalComposition` | `string` | Composição química                               |
| `coverPhoto`          | `string` | URL da imagem (`expo-image`)                      |

> Nota: o texto de prateleira (`Prateleira 3F`) e o indicador de estoque estão hardcoded no card — ver seção 10.

### `MedicationForm` (`forms/medication.form.tsx`)

Formulário compartilhado por cadastro e edição. Recebe `control`, `formErrors` e `onPhotoTaken`. Campos:

| Campo               | Componente             | Label                    |
| ------------------- | ---------------------- | ------------------------ |
| `name`              | `TextInput`            | Nome                     |
| `chemicalComposition` | `TextInput`          | Composição química       |
| `dosageInstructions`| `TextInput`            | Posologia                |
| `shelfLocation`     | `PharmaDropdownPicker` | Posição na prateleira    |
| `boxPrice`          | `CurrencyInput`        | Preço da caixa           |
| `unitPrice`         | `CurrencyInput`        | Preço da unidade         |
| `usefulness`        | `TextInput`            | Uso da medicação         |
| `stockAvailability` | `TextInput` (numérico) | Estoque                  |
| `samplePhotoUrl`    | `PharmaImagePicker`    | Foto do medicamento      |

> Nota: os itens do dropdown `shelfLocation` estão hardcoded (`[{ label: "teste", value: "test" }]`) — ver seção 10.

Demais componentes do módulo: `HomeHeader` (título do header da Home), `MedicineCoverImage` (imagem de capa no detalhe) e `PriceBox` (exibição de preço).

---

## 9. Rotas

### `/` (Home)

**Arquivo:** `app/index.tsx` → `screens/home/Home.screen.tsx`

#### Layout

```
┌──────────────────────────────┐
│ [HomeHeader]                  │  ← header custom (Stack.Screen)
├──────────────────────────────┤
│ [ Searchbar: "Nome, composto  │
│   ou função" ]                │
│                               │
│ [ MedicationList ]            │
│   ┌──────────────────────┐    │
│   │ img  Nome            ▍│    │  ← MedicationCard (Link → /[id])
│   │      composição      ▍│    │
│   │      📍 Prateleira    │    │
│   └──────────────────────┘    │
│   ... (scroll infinito)       │
│                               │
│                     ( + )     │  ← FAB cadastro → /register
│                     ( 💬 )    │  ← FAB chatbot → /(chatbot)
└──────────────────────────────┘
```

#### Comportamento

- Busca com debounce; ao digitar, alterna lista completa ↔ resultados.
- Estado vazio: "Não encontramos nenhum remédio".
- Loading: `ActivityIndicator` no lugar da lista; spinner no rodapé ao paginar.
- Pull-to-refresh recarrega a lista.
- FAB `+` → cadastro; FAB chat → chatbot.

### `/(medication)/register`

**Arquivo:** `app/(medication)/register.tsx` → `screens/medicationRegister/MedicationRegister.screen.tsx`

#### Layout

```
┌──────────────────────────────┐
│ title: "Registrar medicamento"│
├──────────────────────────────┤
│ Registro de Medicamento       │
│ Por favor, preencha os campos │
│                               │
│ [ MedicationForm ]            │
│   Nome / Composição / ...     │
│   Foto do medicamento         │
├──────────────────────────────┤
│ [ Voltar ]  [ Registrar ]     │  ← barra fixa de ações
└──────────────────────────────┘
```

#### Comportamento

- Botão "Registrar" desabilitado enquanto `!isFormValid` ou loading.
- Requer foto para submeter (faz upload antes de criar).
- "Voltar" → `router.back()`.

### `/(medication)/[id]` (Detalhe)

**Arquivo:** `app/(medication)/[id].tsx` → `screens/medicationDetail/MedicationDetail.screen.tsx`

#### Layout

```
┌──────────────────────────────┐
│ title: <nome do medicamento>  │
├──────────────────────────────┤
│ [ MedicineCoverImage ]        │
│ [ GeneralInfo ]               │  nome, estoque, prateleira,
│                               │  preços, utilidade
│ [ MedicationInformation ]     │  composição, posologia, ...
│ [ QuickActions ]              │  Editar / Excluir
└──────────────────────────────┘
   Dialog "Apagar Medicamento" (confirmação)
```

#### Comportamento

- Loading: `ActivityIndicator`. Se `medication` indefinido, renderiza `null`.
- Ação Editar → `/(medication)/(edit)/[id]`.
- Ação Excluir → abre `Dialog` de confirmação; confirmar chama delete e volta (`router.back()`).

### `/(medication)/(edit)/[id]` (Edição)

**Arquivo:** `app/(medication)/(edit)/[id].tsx` → `screens/editMedication/MedicationEdit.screen.tsx`

#### Layout

```
┌──────────────────────────────┐
│ title: "Editar medicamento"   │
├──────────────────────────────┤
│ Edição de Medicamento         │
│ [ MedicationForm ]  (pré-      │
│   preenchido com os dados)    │
├──────────────────────────────┤
│ [ Voltar ]  [ Atualizar ]     │
└──────────────────────────────┘
```

#### Comportamento

- Form pré-preenchido via `values: data` da query de detalhe.
- Só reenvia a foto se ela foi trocada.
- "Atualizar" desabilitado enquanto `!isFormValid` ou loading; sucesso volta após toast.

---

## 10. Regras de negócio

1. **Paginação:** a lista carrega em blocos de `GET_MEDICATIONS_LIMIT = 5`; o backend controla o fim via `nextPage: null`.
2. **Busca x lista:** busca só ativa com termo (com debounce) de tamanho `> 0`; abaixo disso vale a lista paginada.
3. **Foto obrigatória no cadastro:** o submit de registro só ocorre se houver foto selecionada; a foto é enviada ao `/files` e a `url` retornada vira `samplePhotoUrl`.
4. **Foto na edição:** upload só acontece se a foto foi alterada (`isPhotoUpdated`); caso contrário reaproveita a URL atual.
5. **Preços em centavos:** o contrato ([Schema Medication](./api-reference.md#3-medication)) define `boxPrice`/`unitPrice` como inteiros em centavos. Os tipos locais divergem (`number` na lista, `string` no detalhe) — atenção ao formatar/parsear.
6. **`boxPrice` opcional no DTO, obrigatório no form:** `CreateMedicationDTO.boxPrice` é opcional, mas o schema do formulário exige o campo.
7. **Exclusão é irreversível** e confirmada por diálogo antes de executar.
8. **Invalidação de cache:** toda mutação invalida `LIST_MEDICATIONS`; update também invalida `MEDICATION_DETAIL`.
9. **Backend obrigatório:** `BASE_URL = http://10.0.2.2:3000` (emulador Android). O iOS Simulator **não** alcança `10.0.2.2`.

### Pendências conhecidas (hardcoded / TODO)

- `MedicationCard` mostra "Prateleira 3F" e o indicador de estoque fixos (não usam os dados do item).
- Dropdown `shelfLocation` no form tem itens fixos (`teste`/`test`).
- `MedicationService.getAllMedications` tem `TODO` para mapear a resposta em um model local.

---

## 11. Extensão futura

Para adicionar um novo caso de uso ao módulo:

1. Adicionar o método em `services/medication.service.ts` (ou `files.service.ts` se envolver arquivos).
2. Adicionar/ajustar tipos em `types/dto/` (request) e `types/responses/` (response), e exportá-los em `types/index.d.ts`.
3. Adicionar a query key em `state/medication.queries.key.ts` (se necessário) e a query/mutation em `state/medication.model.ts`, com a invalidação de cache adequada.
4. Criar o view-model em `features/medicines/effects/use*ViewModel.tsx` com o estado e os handlers.
5. Criar a tela em `features/medicines/screens/<nome>/` (component + `styles.ts`) consumindo o view-model.
6. Criar a rota fina em `app/(medication)/` renderizando apenas a tela.
7. Atualizar este documento.
