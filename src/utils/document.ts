import { formatDisplayDate } from './date';

export function formatDocumentDate(value: string): string {
  if (!value) return '–';
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? formatDisplayDate(value) : value;
}
