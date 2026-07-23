const brlFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formata um valor em centavos (integer) para string em reais no padrão pt-BR.
 * Ex.: `4800` → `"48,00"`. O prefixo "R$" fica a cargo do componente.
 */
export function centsToBRL(cents: number): string {
  return brlFormatter.format(cents / 100);
}

/**
 * Converte centavos (integer) para reais (number decimal).
 * Ex.: `4800` → `48`. Usado para popular inputs que operam em reais.
 */
export function centsToReais(cents: number): number {
  return cents / 100;
}

/**
 * Converte reais (number decimal ou string) para centavos (integer).
 * Ex.: `48` / `"48.00"` → `4800`. Usado na borda de envio para a API.
 */
export function reaisToCents(reais: number | string): number {
  return Math.round(Number(reais) * 100);
}
