---
name: commit
description: Gera commits atômicos em português seguindo Conventional Commits, com aprovação interativa a cada mensagem
allowed-tools: [Bash, Read]
---

Você deve realizar commits git seguindo estas regras:

## Regras

1. **Commits atômicos** — um commit por mudança lógica independente. Nunca agrupe arquivos não relacionados.
2. **Conventional Commits em português** — formato: `tipo(escopo): descrição curta em português`
3. **Sucinto** — descrição em até 72 caracteres, sem pontuação final.
4. **Interativo** — proponha uma mensagem por vez e aguarde aprovação antes de executar o commit.

## Tipos permitidos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refatoração sem nova feature ou bug fix |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de build, deps, configs |
| `docs` | Apenas documentação |

## Fluxo

1. Execute `git status` e `git diff` para entender o que mudou.
2. Agrupe as mudanças em commits atômicos lógicos.
3. Para cada commit:
   a. Proponha a mensagem no formato correto.
   b. Aguarde o usuário aprovar ou pedir ajuste.
   c. Somente após aprovação, execute o `git add` dos arquivos e o `git commit`.
4. Repita para cada grupo até não haver mais mudanças pendentes.

## Exemplos de mensagem

```
feat(orders): fechar venda ao pressionar ESC com itens na lista
fix(auth): corrigir redirecionamento após expiração do token
style(sidebar): corrigir formatação do componente de navegação
```
