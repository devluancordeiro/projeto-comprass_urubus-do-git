export function formatCurrency(value: number) {
  return `${value.toFixed(2)} R$`.replace('.', ',');
}
