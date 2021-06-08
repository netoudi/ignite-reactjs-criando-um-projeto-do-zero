import * as fns from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: string, format: string): string {
  return fns.format(fns.parseISO(date), format, { locale: ptBR });
}
