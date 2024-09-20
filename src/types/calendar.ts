export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  allDay?: boolean;
  end?: string;
}

export interface Horario {
  dia: string;
  hora: string;
}