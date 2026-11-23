const pad = (value: number): string => String(value).padStart(2, '0');

export function getTodayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return '–';
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(year, month - 1, day).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function calculateDueDate(invoiceDate: string, days = 7): string {
  if (!invoiceDate) return '';
  const [year, month, day] = invoiceDate.split('-').map(Number);
  if (!year || !month || !day) return '';
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isBackdated(isoDate: string): boolean {
  return Boolean(isoDate) && isoDate < getTodayISO();
}
